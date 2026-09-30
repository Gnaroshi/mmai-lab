'use strict';
document.documentElement.classList.add('js');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const videos = [...document.querySelectorAll('.loop-video')];
const visible = new Set();
const pausedByUser = new WeakSet();
const manuallyPlaying = new WeakSet();
const globalToggle = document.querySelector('#toggle-motion');
const dialog = document.querySelector('#video-dialog');
const expanded = document.querySelector('#expanded-video');
let motionEnabled = !reducedMotion.matches;
let dialogTrigger = null;
function updateButton(video) {
  const button = video.closest('.media-shell').querySelector('.clip-toggle');
  const name = video.closest('.media-shell').dataset.title;
  button.textContent = video.paused ? 'Play' : 'Pause';
  button.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${name}`);
  button.setAttribute('aria-pressed', String(!video.paused));
}
function refreshVideos() {
  videos.forEach(video => {
    if ((motionEnabled || manuallyPlaying.has(video)) && visible.has(video) && !video.closest('[hidden]') && !document.hidden && !dialog.open && !pausedByUser.has(video)) {
      video.play().catch(() => updateButton(video));
    } else video.pause();
    updateButton(video);
  });
  globalToggle.textContent = motionEnabled ? 'Pause videos' : 'Play videos';
  globalToggle.setAttribute('aria-pressed', String(motionEnabled));
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
  refreshVideos();
}, {threshold:0.15});
videos.forEach(video => {
  video.controls = false;
  observer.observe(video);
  video.addEventListener('play', () => updateButton(video));
  video.addEventListener('pause', () => updateButton(video));
  const shell = video.closest('.media-shell');
  shell.querySelector('.clip-toggle').addEventListener('click', () => {
    if (video.paused) {
      pausedByUser.delete(video);
      manuallyPlaying.add(video);
      video.play().catch(() => updateButton(video));
    } else {
      pausedByUser.add(video);
      manuallyPlaying.delete(video);
      video.pause();
    }
  });
  shell.querySelector('.clip-expand').addEventListener('click', event => {
    dialogTrigger = event.currentTarget;
    document.querySelector('#dialog-title').textContent = shell.dataset.title;
    expanded.src = video.currentSrc || video.querySelector('source').src;
    expanded.poster = video.poster;
    expanded.currentTime = video.currentTime;
    dialog.showModal();
    refreshVideos();
    if (!reducedMotion.matches) expanded.play().catch(() => {});
  });
});
globalToggle.addEventListener('click', () => {
  motionEnabled = !motionEnabled;
  videos.forEach(video => manuallyPlaying.delete(video));
  if (motionEnabled) videos.forEach(video => pausedByUser.delete(video));
  refreshVideos();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) expanded.pause();
  refreshVideos();
});
reducedMotion.addEventListener('change', event => {
  if (event.matches) {motionEnabled = false; expanded.pause(); refreshVideos();}
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close', () => {expanded.pause(); expanded.removeAttribute('src');expanded.load();refreshVideos();dialogTrigger?.focus();});

const filters = [...document.querySelectorAll('[data-filter]')];
function filterDemos(filter) {
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  document.querySelectorAll('.demo-card').forEach(card => {card.hidden = filter !== 'all' && card.dataset.category !== filter;});
  refreshVideos();
}
filters.forEach(button => button.addEventListener('click', () => filterDemos(button.dataset.filter)));
filterDemos('spatial');
// Use a common source timeline for the four views of the same recorded sequence.
const sceneVideos = videos.filter(video => video.dataset.sync === 'scene');
document.querySelector('#restart-scene').addEventListener('click', async () => {
  await Promise.all(sceneVideos.map(video => new Promise(resolve => {
    video.pause();
    if (video.readyState >= 1) return resolve();
    video.addEventListener('loadedmetadata', resolve, {once:true});
    video.addEventListener('error', resolve, {once:true});
    video.load();
  })));
  sceneVideos.forEach(video => {video.currentTime=0;pausedByUser.delete(video);});
  motionEnabled = true; refreshVideos();
});
// Correct drift only among currently playing views, without loading offscreen videos.
setInterval(() => {
  const active = sceneVideos.filter(v => !v.paused && v.readyState >= 2);
  const reference = active[0];
  if (reference) active.slice(1).forEach(video => {
    if (Math.abs(video.currentTime-reference.currentTime)>.35) video.currentTime=reference.currentTime;
  });
},1000);

const tcpButtons = [...document.querySelectorAll('[data-tcp]')];
function showTCP(task) {
  tcpButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tcp === task)));
  document.querySelectorAll('[data-tcp-panel]').forEach(panel => {panel.hidden = panel.dataset.tcpPanel !== task;});
  refreshVideos();
}
tcpButtons.forEach(button => button.addEventListener('click', () => showTCP(button.dataset.tcp)));
if (tcpButtons.length) showTCP('cabinet');

const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab, focus=false) {
  tabs.forEach(button => {
    const active = button === tab;
    button.setAttribute('aria-selected', String(active));button.tabIndex=active?0:-1;
    document.getElementById(button.getAttribute('aria-controls')).hidden=!active;
  });
  if(focus)tab.focus();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateTab(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();activateTab(tabs[next],true);}
  });
});
activateTab(tabs[0]);

document.querySelector('#copy-citation').addEventListener('click',async()=>{
  const text=document.querySelector('#bibtex').textContent;
  const button=document.querySelector('#copy-citation');
  const status=document.querySelector('#copy-status');
  try{
    if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(text);
    else{
      const field=document.createElement('textarea');field.value=text;field.style.cssText='position:fixed;left:-9999px';document.body.append(field);field.select();
      const success=document.execCommand('copy');field.remove();if(!success)throw new Error();button.focus();
    }
    status.textContent='Citation copied';button.textContent='Copied';
  }catch(_){status.textContent='Select the citation to copy.';button.textContent='Try again';}
});
document.querySelectorAll('a[href^="#"]').forEach(anchor=>anchor.addEventListener('click',()=>{
  const target=document.getElementById(anchor.hash.slice(1));
  if(target?.hasAttribute('tabindex'))setTimeout(()=>target.focus({preventScroll:true}),0);
}));
