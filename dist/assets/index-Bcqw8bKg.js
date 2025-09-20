(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const w="modulepreload",b=function(r,e){return new URL(r,e).href},g={},x=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),u=document.querySelector("meta[property=csp-nonce]"),p=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));s=Promise.allSettled(t.map(c=>{if(c=b(c,i),c in g)return;g[c]=!0;const d=c.endsWith(".css"),v=d?'[rel="stylesheet"]':"";if(!!i)for(let m=a.length-1;m>=0;m--){const h=a[m];if(h.href===c&&(!d||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${v}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":w,d||(l.as="script"),l.crossOrigin="",l.href=c,p&&l.setAttribute("nonce",p),document.head.appendChild(l),d)return new Promise((m,h)=>{l.addEventListener("load",m),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(a){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=a,window.dispatchEvent(u),!u.defaultPrevented)throw a}return s.then(a=>{for(const u of a||[])u.status==="rejected"&&n(u.reason);return e().catch(n)})},o={ads:{rotationIntervalMs:2e4,textAdFallback:!0,adFolder:"./assets/images/ads/",supportedFormats:[".jpg",".jpeg",".png",".webp"],adMessages:{"join-queue-premium-member.jpg":{title:"🎯 Premium Queue Membership",message:`Congratulations! You've discovered the secret to queue enlightenment.

Premium members get:
• Exclusive waiting experiences
• Advanced queue anxiety management
• Priority access to... more queues!`,buttonText:"Join Now!"},"quetendo64.jpg":{title:"🎮 Quetendo 64",message:`Experience the revolutionary new gaming console!

Now with:
• 64-bit queue processing
• Ultra-realistic waiting graphics
• Backwards compatibility with all your favorite queues

Coming Soon: 2069!`,buttonText:"Pre-Order"},"talk-show-charity.jpg":{title:"Charity for Kimmel",message:`Save the talk show hosts!

They have been fired for being naughty but they deserve a second chance.

Donate now, every penny counts

`,buttonText:"Donate"},"alienwarez-gaming-pc.jpg":{title:"👽 Alienwarez Gaming PC",message:`Experience gaming like never before!

Features:
• Powered by actual alien technology
• RGB lighting visible from space
• Can run Crysis at 4K while queuing
• Built-in queue acceleration cores
• Comes with free abduction insurance!

Now with 200% more FPS in waiting simulators!`,buttonText:"Invade Cart"},"queuelife-insurnace.jpg":{title:"🛡️ QueueLife Insurance",message:`Protect your most valuable asset: your position in line!

Coverage includes:
• Premium cut-in protection
• System maintenance displacement benefits
• Queue anxiety therapy sessions
• Emergency queue skip vouchers
• Peace of mind while waiting

*Coverage not valid during actual emergencies or when queue reaches zero`,buttonText:"Get Quote"},"wandering-queue-guild.jpg":{title:"⚔️ Wandering Queue Guild",message:`Join the legendary guild of professional queue warriors!

Benefits:
• Epic queue combat training
• Legendary waiting armor sets
• Access to mythical queue dungeons
• Guild hall with premium waiting areas
• Weekly raid on the DMV queue boss

Level up your waiting skills today!`,buttonText:"Join Guild"},default:{title:"📢 Special Offer!",message:`Thanks for clicking on our ad!

While you're waiting in queue, why not wait in another queue?

Our premium queue experience offers:
• Longer wait times
• More uncertainty
• Enhanced frustration levels`,buttonText:"Learn More"}}},queue:{initialPositionMin:150,initialPositionMax:200,updateIntervalMin:500,updateIntervalMax:1500,waitTimeUpdateChance:.01,maxCountdownJump:50,positionEvents:{normalProgress:.7,smallJump:.15,positionJump:.03,premiumCut:.02,maintenance:.02,stall:.08}},audio:{backgroundMusicVolume:.4,soundEffectsVolume:.3,backgroundMusicFile:"./assets/sounds/lofi_seville.mp3"},achievements:{displayAnimations:!0,saveProgress:!0,checkFrequencyMs:1e3},ui:{positionGlowIntensity:.5,animationSpeed:300,themeTransitionSpeed:1e3,showDebugLogs:!0},news:{rotationIntervalMs:1e4,showTimestamp:!0,maxItems:50,fadeTransition:!0,autoStart:!0},themes:{defaultTheme:"basic",availableThemes:["basic","fancy","action","space","battle","mystical","infinite"]}};function k(r,e,t){return o[r]&&o[r].hasOwnProperty(e)?(o[r][e]=t,console.log(`Config updated: ${r}.${e} = ${t}`),!0):(console.warn(`Invalid config key: ${r}.${e}`),!1)}function T(r,e=null){var t;return e===null?o[r]:(t=o[r])==null?void 0:t[e]}typeof window<"u"&&(window.gameConfig=o,window.updateConfig=k,window.getConfig=T);class f{constructor(){this.state={currentQueue:1,position:Math.floor(Math.random()*(o.queue.initialPositionMax-o.queue.initialPositionMin))+o.queue.initialPositionMin,waitTime:"",isActive:!1,achievements:[],currentAd:0,queueTheme:"basic",startTime:Date.now(),totalWaitTime:0,queueEvents:[],lastUpdate:Date.now(),isCompleting:!1},this.state.waitTime=this.calculateFakeWaitTime(),this.queues={1:{name:"Queue Game",theme:"basic",description:"Welcome to the queue!",targetPosition:0,eventChance:.3},2:{name:"Queue Game 2: The Queuening",theme:"fancy",description:"Premium waiting experience",targetPosition:0,eventChance:.4},3:{name:"Queue Game 3: Queue Hard",theme:"action",description:"Extreme queue combat",targetPosition:0,eventChance:.5},4:{name:"Queue Game 4: Queue Wars",theme:"space",description:"Intergalactic waiting",targetPosition:0,eventChance:.6},5:{name:"Queue Game 5: Queue Royale",theme:"battle",description:"Battle for position supremacy",targetPosition:0,eventChance:.7},6:{name:"Queue Game 6: The Queue Awakens",theme:"mystical",description:"Achieve enlightenment through waiting",targetPosition:0,eventChance:.8},999:{name:"Queue Game ∞",theme:"infinite",description:"The eternal queue",targetPosition:0,eventChance:1}},this.eventListeners={},this.updateInterval=null,this.countdownInterval=null,this.eventCooldown=0,this.nextUpdateTime=0,this.countdownSeconds=0,this.pauseAtZero=!1,this.pauseStartTime=0,this.inPredictableMode=!1,this.stickCount=0}on(e,t){this.eventListeners[e]||(this.eventListeners[e]=[]),this.eventListeners[e].push(t)}emit(e,t){this.eventListeners[e]&&this.eventListeners[e].forEach(i=>i(t))}init(){this.loadState(),this.state.isActive=!0,this.startQueue(),console.log("Queue Game initialized:",this.getCurrentQueue().name)}startQueue(){this.updateInterval&&clearInterval(this.updateInterval),this.countdownInterval&&clearTimeout(this.countdownInterval),this.pauseAtZero=!1,this.pauseStartTime=0,this.inPredictableMode=!1,this.stickCount=0,this.scheduleNextUpdate(),this.startCountdown(),this.emit("queueStarted",this.getCurrentQueue())}scheduleNextUpdate(){const e=Math.random()*(o.queue.updateIntervalMax-o.queue.updateIntervalMin)+o.queue.updateIntervalMin;this.nextUpdateTime=Date.now()+e,this.updateInterval=setTimeout(()=>{this.updateQueuePosition(),this.scheduleNextUpdate()},e)}startCountdown(){this.countdownSeconds===0&&(this.countdownSeconds=Math.floor(Math.random()*30)+15);const e=()=>{if(!this.state.isActive)return;if(this.countdownSeconds>100){const i=this.countdownSeconds;this.countdownSeconds=100,console.log(`SAFETY: Countdown capped at 100 (was ${i})`)}if(this.countdownSeconds===0&&this.pauseAtZero)if(Date.now()-this.pauseStartTime<2e3){this.emit("countdownUpdate",this.countdownSeconds),this.countdownInterval=setTimeout(e,100);return}else this.pauseAtZero=!1;if(this.countdownSeconds>10){this.inPredictableMode=!1,this.countdownSeconds>100&&(this.countdownSeconds=50,console.log(`ERRATIC MODE: Countdown too high (was ${this.countdownSeconds}), reset to 50`)),console.log(`ERRATIC MODE: Starting at ${this.countdownSeconds}`);const i=Math.random();if(this.stickCount>=3)this.countdownSeconds=10,this.inPredictableMode=!0,this.stickCount=0,console.log(`ERRATIC MODE: FORCED progression after ${this.stickCount} sticks - ENTERING PREDICTABLE MODE at 10`);else if(i<.15)this.stickCount++,console.log(`ERRATIC MODE: Timer stuck at ${this.countdownSeconds} (stick #${this.stickCount})`);else if(i<.3){this.stickCount=0;const s=Math.random()<.95?-1:1;let n=Math.floor(Math.random()*3)+1;if(s>0){n=Math.min(n,o.queue.maxCountdownJump,100);const a=this.countdownSeconds+n;this.countdownSeconds=Math.min(a,100),console.log(`ERRATIC MODE: Small jump UP by ${n} from ${this.countdownSeconds-n} to ${this.countdownSeconds} (max 100)`)}else this.countdownSeconds=10,this.inPredictableMode=!0,console.log("ERRATIC MODE: Jump down - ENTERING PREDICTABLE MODE at 10")}else this.stickCount=0,this.countdownSeconds=10,this.inPredictableMode=!0,console.log("ERRATIC MODE: Normal countdown - ENTERING PREDICTABLE MODE at 10");console.log(`ERRATIC MODE: Ended at ${this.countdownSeconds}`)}else this.countdownSeconds<=10&&this.countdownSeconds>0?(this.inPredictableMode||(this.inPredictableMode=!0,console.log(`ENTERING PREDICTABLE MODE at ${this.countdownSeconds}`)),console.log(`PREDICTABLE MODE: ${this.countdownSeconds} -> ${this.countdownSeconds-1}`),this.countdownSeconds=this.countdownSeconds-1,this.countdownSeconds===0&&(this.inPredictableMode=!1,this.pauseAtZero=!0,this.pauseStartTime=Date.now(),console.log("STARTING 2-SECOND PAUSE AT ZERO"))):this.countdownSeconds===0&&!this.pauseAtZero&&(this.inPredictableMode=!1,this.stickCount=0,Math.random()<.02&&(this.countdownSeconds=Math.floor(Math.random()*20)+15,console.log(`RESET: Jumped to ${this.countdownSeconds}`)));this.emit("countdownUpdate",this.countdownSeconds);let t;if(this.inPredictableMode||this.countdownSeconds<=10&&this.countdownSeconds>=0&&!this.pauseAtZero)t=1e3,console.log("TIMING: Predictable mode - next update in 1000ms");else{if(this.pauseAtZero)return;t=Math.random()*400+200,console.log(`TIMING: Erratic mode - next update in ${t}ms`)}this.countdownInterval=setTimeout(e,t)};e()}update(){const e=Date.now(),t=e-this.state.lastUpdate;this.state.totalWaitTime+=t,this.state.lastUpdate=e,Math.random()<o.queue.waitTimeUpdateChance&&(this.state.waitTime=this.calculateFakeWaitTime(),this.emit("waitTimeChanged",this.state.waitTime)),this.eventCooldown>0&&(this.eventCooldown-=t)}updateQueuePosition(){if(!this.state.isActive)return;const e=this.getCurrentQueue(),t=this.getPositionUpdateEvents(e),i=Math.random();let s=0;for(const n of t)if(s+=n.chance,i<=s){n.action();break}this.state.position<=0&&!this.state.isCompleting&&(this.state.isCompleting=!0,this.completeQueue()),this.emit("positionChanged",this.state.position),this.saveState()}getPositionUpdateEvents(e){const t=o.queue.positionEvents;return[{chance:t.normalProgress,action:()=>{this.state.position=Math.max(0,this.state.position-Math.floor(Math.random()*3)-1)}},{chance:t.smallJump,action:()=>{this.state.position=Math.max(0,this.state.position-Math.floor(Math.random()*10)-5)}},{chance:t.positionJump,action:()=>{this.eventCooldown<=0&&this.triggerQueueEvent("position_jump")}},{chance:t.premiumCut,action:()=>{this.eventCooldown<=0&&this.triggerQueueEvent("premium_cut")}},{chance:t.maintenance,action:()=>{this.eventCooldown<=0&&this.triggerQueueEvent("maintenance")}},{chance:t.stall,action:()=>{}}]}triggerQueueEvent(e){const i={position_jump:{message:"Queue system error! You've been moved back due to suspicious activity.",action:()=>{const s=Math.floor(Math.random()*500)+100;this.state.position+=s},duration:3e3},premium_cut:{message:"1,247 Premium Queue™ members have joined ahead of you!",action:()=>{const s=Math.floor(Math.random()*1500)+500;this.state.position+=s},duration:4e3},maintenance:{message:"Queue maintenance in progress... Please remain patient.",action:()=>{setTimeout(()=>{this.state.position+=Math.floor(Math.random()*50)+10},2e3)},duration:5e3},mass_exodus:{message:"Lucky you! Mass exodus detected ahead of you.",action:()=>{const s=Math.floor(Math.random()*1e3)+200;this.state.position=Math.max(0,this.state.position-s)},duration:2e3},vip_invasion:{message:"VIP event attendees are joining the queue...",action:()=>{const s=Math.floor(Math.random()*2e3)+1e3;this.state.position+=s},duration:4e3}}[e];i&&(i.action(),this.emit("queueEvent",{type:e,message:i.message,duration:i.duration}),this.eventCooldown=i.duration+Math.random()*1e4)}calculateFakeWaitTime(){const e=this.state.position,t=Math.random()*5+.5,i=e*t/10;if(i<60)return`${Math.floor(i)} seconds`;if(i<3600)return`${Math.floor(i/60)} minutes`;if(i<86400){const s=Math.floor(i/3600),n=Math.floor(i%3600/60);return`${s}h ${n}m`}else{const s=Math.floor(i/86400),n=Math.floor(i%86400/3600);return`${s} days, ${n} hours`}}completeQueue(){const e=this.getCurrentQueue();console.log(`Queue ${this.state.currentQueue} completed!`),this.state.isActive=!1,this.emit("showCompletionScreen",e)}advanceToNextQueue(){let e;this.state.currentQueue<6?e=this.state.currentQueue+1:this.state.currentQueue===6?e=999:e=1,this.state.currentQueue=e,this.state.position=Math.floor(Math.random()*(o.queue.initialPositionMax-o.queue.initialPositionMin))+o.queue.initialPositionMin,this.state.waitTime=this.calculateFakeWaitTime(),this.state.queueTheme=this.getCurrentQueue().theme,this.state.isActive=!0,this.state.isCompleting=!1,this.emit("queueCompleted",this.getCurrentQueue()),this.saveState(),this.startQueue()}getCurrentQueue(){return this.queues[this.state.currentQueue]||this.queues[1]}getState(){return{...this.state}}saveState(){try{localStorage.setItem("queueSimulatorState",JSON.stringify({currentQueue:this.state.currentQueue,totalWaitTime:this.state.totalWaitTime,achievements:this.state.achievements}))}catch(e){console.warn("Failed to save state:",e)}}loadState(){try{const e=localStorage.getItem("queueSimulatorState");if(e){const t=JSON.parse(e);this.state.currentQueue=1,this.state.totalWaitTime=t.totalWaitTime||0,this.state.achievements=t.achievements||[],this.state.queueTheme=this.getCurrentQueue().theme,console.log("State loaded: Starting from Queue 1, preserving achievements/stats")}}catch(e){console.warn("Failed to load state:",e)}}buyQueueSkip(){const e=Math.floor(Math.random()*100)+50,t=Math.floor(Math.random()*500)+200;return this.state.position=Math.max(0,this.state.position-e),setTimeout(()=>{this.state.position+=t,this.emit("queueEvent",{type:"premium_backfire",message:"Queue Skip Pro™ activated! You moved forward... wait, what? System error detected.",duration:5e3})},1e3),{success:!0,message:"Purchase successful! Processing..."}}destroy(){this.updateInterval&&clearTimeout(this.updateInterval),this.countdownInterval&&clearTimeout(this.countdownInterval),this.state.isActive=!1,this.saveState()}}const S=Object.freeze(Object.defineProperty({__proto__:null,QueueSimulator:f},Symbol.toStringTag,{value:"Module"}));class C{constructor(){this.ads=[],this.currentAdIndex=0,this.adElement=null,this.rotationInterval=null,this.isLoading=!1,this.currentAdData=null,this.shuffledAds=[],this.shuffleIndex=0,this.preloadedImages=new Map,this.textAds=[{title:"SkipLine Pro™",subtitle:"Jump 1000 positions instantly!",disclaimer:"(Results not guaranteed)",type:"queue-enhancement"},{title:"Queue Anxiety Pills",subtitle:"Feel better while waiting longer!",disclaimer:"Side effects may include more waiting",type:"wellness"},{title:"Premium Queue Pass",subtitle:"Skip the line to get into a premium line!",disclaimer:"Premium line may be longer",type:"queue-enhancement"},{title:"Gaming Chair Supreme",subtitle:"Now with built-in queue anxiety support!",disclaimer:"Chair does not reduce wait times",type:"gaming"},{title:"RGB Queue Lights",subtitle:"Your setup will look amazing while waiting!",disclaimer:"Lights do not affect queue position",type:"gaming"},{title:"TaxQueue Pro",subtitle:"Do your taxes while you wait!",disclaimer:"May increase total waiting time",type:"productivity"},{title:"Queue University",subtitle:"Get your degree during downtime!",disclaimer:"Diploma not recognized by employers",type:"productivity"},{title:"QueueSafe™",subtitle:"Protect against random position loss!",disclaimer:"Does not actually protect anything",type:"insurance"},{title:"Queue Dating App",subtitle:"Meet other singles in your queue!",disclaimer:"All profiles are bots",type:"lifestyle"},{title:"Premium Queue Snacks",subtitle:"Sustenance for the eternal wait!",disclaimer:"May cause queue position to increase",type:"food"}],this.adFolder=o.ads.adFolder,this.supportedFormats=o.ads.supportedFormats}async init(){if(this.adElement=document.getElementById("current-ad"),!this.adElement){console.warn("Ad display element not found");return}window.gameAdSystem=this,this.showLoadingAd(),this.loadImageAds().then(()=>{this.ads.length===0&&(console.log("No image ads found, using text ads"),this.ads=this.textAds),this.shuffleAds(),this.showCurrentAd(),console.log(`Ad system initialized with ${this.ads.length} ads`)}),this.startRotation(),this.bindEvents()}shuffleAds(){this.shuffledAds=[...this.ads];for(let e=this.shuffledAds.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[this.shuffledAds[e],this.shuffledAds[t]]=[this.shuffledAds[t],this.shuffledAds[e]]}this.shuffleIndex=0,console.log("Ads shuffled for random rotation")}async loadImageAds(){try{const e=[];try{const t=await fetch(`${this.adFolder}manifest.json`);if(t.ok){const i=await t.json();for(const s of i.files)if(this.supportedFormats.some(n=>s.toLowerCase().endsWith(n))){const n=`${this.adFolder}${s}`;e.push({type:"image",src:n,filename:s,alt:this.generateAltText(s)})}console.log("Loaded ads from manifest:",e.map(s=>s.filename)),this.preloadManifestImages(i.files)}}catch{console.log("No manifest found, attempting to discover images...");const i=["join-queue-premium-member.jpg","quetendo64.jpg","talk-show-charity.jpg","skipline-pro.jpg","queue-anxiety-pills.jpg","premium-queue-pass.jpg","gaming-chair-supreme.jpg","rgb-queue-lights.jpg","tax-queue-pro.jpg","queue-university.jpg","queue-safe.jpg","queue-dating-app.jpg","premium-queue-snacks.jpg","queue-insurance.jpg","position-recovery-service.jpg","queue-real-estate.jpg","meditation-queue.jpg","queue-mouse.jpg"];for(const s of i)try{const n=`${this.adFolder}${s}`;await this.checkImageExists(n)&&e.push({type:"image",src:n,filename:s,alt:this.generateAltText(s)})}catch{}}this.ads=e,e.length>0?console.log(`Loaded ${e.length} image ads:`,e.map(t=>t.filename)):console.log("No image ads found, falling back to text ads")}catch(e){console.warn("Failed to load image ads:",e)}}checkImageExists(e){return new Promise(t=>{const i=new Image;i.onload=()=>{this.preloadedImages.set(e,i),console.log(`✓ Ad image preloaded: ${e}`),t(!0)},i.onerror=()=>{console.log(`✗ Ad image not found: ${e}`),t(!1)},i.src=e})}async preloadManifestImages(e){console.log("🔄 Preloading ad images...");const t=e.filter(i=>this.supportedFormats.some(s=>i.toLowerCase().endsWith(s))).map(i=>{const s=`${this.adFolder}${i}`;return this.preloadSingleImage(s)});try{await Promise.all(t),console.log(`✅ Successfully preloaded ${this.preloadedImages.size} ad images`)}catch(i){console.warn("Some ad images failed to preload:",i)}}preloadSingleImage(e){return new Promise(t=>{if(this.preloadedImages.has(e)){t(!0);return}const i=new Image;i.onload=()=>{this.preloadedImages.set(e,i),t(!0)},i.onerror=()=>{console.warn(`Failed to preload: ${e}`),t(!1)},i.src=e})}generateAltText(e){return e.replace(/\.(jpg|jpeg)$/i,"").replace(/[-_]/g," ").replace(/\b\w/g,t=>t.toUpperCase())}showLoadingAd(){this.adElement&&(this.adElement.innerHTML=`
            <div class="text-ad" style="text-align: center; color: var(--text-secondary);">
                <h3 style="color: var(--accent-color); margin-bottom: 10px;">📺 Loading Ads...</h3>
                <p style="margin: 0; font-style: italic;">Please wait while we load amazing offers!</p>
            </div>
        `)}startRotation(){this.rotationInterval=setInterval(()=>{this.shuffledAds.length>0&&this.nextAd()},o.ads.rotationIntervalMs)}showCurrentAd(){if(!this.adElement||this.shuffledAds.length===0)return;const e=this.shuffledAds[this.shuffleIndex];this.currentAdData=e,this.adElement.classList.add("ad-leaving"),setTimeout(()=>{e.type==="image"?this.displayImageAd(e):this.displayTextAd(e),this.adElement.classList.remove("ad-leaving"),this.adElement.classList.add("ad-entering"),setTimeout(()=>{this.adElement.classList.remove("ad-entering")},500)},250)}displayImageAd(e){this.preloadedImages.get(e.src)?(this.adElement.innerHTML=`
                <img src="${e.src}"
                     alt="${e.alt}"
                     style="max-width: 100%; height: auto; border-radius: 4px; cursor: pointer; opacity: 1; transition: opacity 0.3s ease;"
                     onclick="window.gameAdSystem.handleAdClick()">
            `,console.log(`📸 Using preloaded image: ${e.filename}`)):(this.adElement.innerHTML=`
                <div style="display: flex; align-items: center; justify-content: center; min-height: 100px; color: var(--text-secondary);">
                    <span>Loading ad...</span>
                </div>
            `,setTimeout(()=>{this.adElement.innerHTML=`
                    <img src="${e.src}"
                         alt="${e.alt}"
                         style="max-width: 100%; height: auto; border-radius: 4px; cursor: pointer; opacity: 0; transition: opacity 0.3s ease;"
                         onload="this.style.opacity = 1;"
                         onerror="this.style.display='none'"
                         onclick="window.gameAdSystem.handleAdClick()">
                `},100))}displayTextAd(e){this.adElement.innerHTML=`
            <div class="text-ad" style="cursor: pointer;" onclick="window.gameAdSystem.handleAdClick()">
                <h3 style="color: var(--accent-color); margin-bottom: 5px;">${e.title}</h3>
                <p style="margin-bottom: 8px;">${e.subtitle}</p>
                <small style="color: var(--text-secondary); font-style: italic;">${e.disclaimer}</small>
            </div>
        `}nextAd(){this.shuffleIndex++,this.shuffleIndex>=this.shuffledAds.length&&(console.log("Completed full ad rotation, reshuffling..."),this.shuffleAds()),this.showCurrentAd()}bindEvents(){this.adElement&&(this.adElement.addEventListener("click",()=>{this.handleAdClick()}),this.adElement.addEventListener("mouseenter",()=>{this.adElement.style.transform="scale(1.02)"}),this.adElement.addEventListener("mouseleave",()=>{this.adElement.style.transform="scale(1)"}))}update(){var e;Math.random()<.001&&((e=this.adElement)==null||e.classList.add("ad-blinking"),setTimeout(()=>{var t;(t=this.adElement)==null||t.classList.remove("ad-blinking")},2e3))}async refreshAds(){console.log("Refreshing ad library..."),await this.loadImageAds(),this.ads.length===0&&(this.ads=this.textAds),this.shuffleAds(),console.log(`Ad library refreshed: ${this.ads.length} ads available`)}handleAdClick(){if(!this.currentAdData)return;let e;this.currentAdData.type==="image"?e=o.ads.adMessages[this.currentAdData.filename]||o.ads.adMessages.default:e={title:this.currentAdData.title,message:this.currentAdData.subtitle+`

`+this.currentAdData.disclaimer,buttonText:"OK"},this.showAdPopup(e),window.gameAchievements&&window.gameAchievements.triggerAdClick()}showAdPopup(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 3px solid var(--accent-color);
            padding: 30px;
            border-radius: 15px;
            z-index: 1000;
            max-width: 450px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.7);
            text-align: center;
        `,t.innerHTML=`
            <h2 style="color: var(--accent-color); margin-bottom: 20px; font-size: 1.4em;">${e.title}</h2>
            <p style="color: var(--text-primary); margin-bottom: 25px; line-height: 1.6; white-space: pre-line;">${e.message}</p>
            <button id="ad-popup-ok" style="
                padding: 12px 25px;
                background: var(--accent-color);
                color: var(--primary-bg);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: inherit;
                font-weight: bold;
                font-size: 1.1em;
                box-shadow: 0 4px 12px rgba(0, 204, 170, 0.4);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">${e.buttonText}</button>
        `,document.body.appendChild(t),t.addEventListener("click",()=>{t.remove()})}destroy(){this.rotationInterval&&clearInterval(this.rotationInterval)}}class M{constructor(){this.audioContext=null,this.sounds={},this.currentTheme="basic",this.isMuted=!1,this.volume=o.audio.soundEffectsVolume,this.backgroundMusic=null,this.isBackgroundMusicPlaying=!1,this.themeAudio={basic:{background:"./assets/sounds/basic-ambient.mp3",beep:"./assets/sounds/basic-beep.mp3",notification:"./assets/sounds/basic-notification.mp3"},fancy:{background:"./assets/sounds/elevator-music.mp3",beep:"./assets/sounds/fancy-chime.mp3",notification:"./assets/sounds/reception-bell.mp3"},action:{background:"./assets/sounds/action-music.mp3",beep:"./assets/sounds/military-beep.mp3",notification:"./assets/sounds/explosion.mp3"},space:{background:"./assets/sounds/space-ambient.mp3",beep:"./assets/sounds/space-beep.mp3",notification:"./assets/sounds/alien-sound.mp3"},battle:{background:"./assets/sounds/battle-music.mp3",beep:"./assets/sounds/battle-horn.mp3",notification:"./assets/sounds/victory-sound.mp3"},mystical:{background:"./assets/sounds/mystical-ambient.mp3",beep:"./assets/sounds/meditation-bell.mp3",notification:"./assets/sounds/mystical-chime.mp3"},infinite:{background:"./assets/sounds/matrix-ambient.mp3",beep:"./assets/sounds/glitch-beep.mp3",notification:"./assets/sounds/digital-noise.mp3"}}}async init(){try{return this.audioContext=new(window.AudioContext||window.webkitAudioContext),await this.loadThemeSounds("basic"),this.loadDefaultBackgroundMusic().catch(e=>{console.warn("Background music failed to load:",e)}),console.log("Audio Manager initialized"),!0}catch(e){return console.warn("Audio initialization failed:",e),!1}}async loadThemeSounds(e){if(this.themeAudio[e]){this.themeAudio[e];try{this.sounds[e]={background:this.createPlaceholderAudio("background",e),beep:this.createPlaceholderAudio("beep",e),notification:this.createPlaceholderAudio("notification",e)},console.log(`Audio loaded for theme: ${e}`)}catch(t){console.warn(`Failed to load audio for theme ${e}:`,t)}}}createPlaceholderAudio(e,t){return{play:()=>{console.log(`[Audio] Playing ${e} sound for ${t} theme`)},stop:()=>{console.log(`[Audio] Stopping ${e} sound for ${t} theme`)},setVolume:i=>{console.log(`[Audio] Setting ${e} volume to ${i}`)}}}async setTheme(e){var t,i;e!==this.currentTheme&&(console.log(`Switching audio theme from ${this.currentTheme} to ${e}`),(t=this.sounds[this.currentTheme])!=null&&t.background&&this.sounds[this.currentTheme].background.stop(),this.currentTheme=e,this.sounds[e]||await this.loadThemeSounds(e),!this.isMuted&&((i=this.sounds[e])!=null&&i.background)&&this.sounds[e].background.play())}playSound(e){var i;if(this.isMuted)return;const t=(i=this.sounds[this.currentTheme])==null?void 0:i[e];t&&(t.setVolume(this.volume),t.play())}playPositionUpdate(){this.playSound("beep")}playQueueEvent(){this.playSound("notification")}playQueueComplete(){this.playSound("notification"),setTimeout(()=>{this.playSound("beep")},500)}playAchievement(){this.playSound("notification")}async loadDefaultBackgroundMusic(){try{return this.backgroundMusic&&(this.backgroundMusic.pause(),this.backgroundMusic=null),this.backgroundMusic=new Audio,this.backgroundMusic.preload="none",this.backgroundMusic.loop=!0,this.backgroundMusic.volume=o.audio.backgroundMusicVolume,this.backgroundMusic.src=o.audio.backgroundMusicFile,console.log("Background music configured (will load when played)"),!0}catch(e){return console.warn("Failed to configure background music:",e),!1}}async ensureMusicLoaded(){if(!this.backgroundMusic)return!1;if(this.backgroundMusic.readyState===0){console.log("Loading background music...");try{await new Promise((e,t)=>{this.backgroundMusic.oncanplaythrough=e,this.backgroundMusic.onerror=t,this.backgroundMusic.load()}),console.log("Background music loaded successfully")}catch(e){return console.warn("Failed to load background music:",e),!1}}return!0}async playBackgroundMusic(){if(!(!this.backgroundMusic||this.isMuted||!await this.ensureMusicLoaded()))try{await this.backgroundMusic.play(),this.isBackgroundMusicPlaying=!0,console.log("Background music started")}catch(t){console.warn("Failed to play background music:",t)}}pauseBackgroundMusic(){this.backgroundMusic&&(this.backgroundMusic.pause(),this.isBackgroundMusicPlaying=!1)}stopBackgroundMusic(){this.backgroundMusic&&(this.backgroundMusic.pause(),this.backgroundMusic.currentTime=0,this.isBackgroundMusicPlaying=!1)}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),Object.values(this.sounds).forEach(t=>{Object.values(t).forEach(i=>{i.setVolume(this.volume)})}),this.backgroundMusic&&(this.backgroundMusic.volume=o.audio.backgroundMusicVolume)}toggleMute(){var e;return this.isMuted=!this.isMuted,this.isMuted?(Object.values(this.sounds).forEach(t=>{Object.values(t).forEach(i=>{i.stop()})}),this.pauseBackgroundMusic()):((e=this.sounds[this.currentTheme])!=null&&e.background&&this.sounds[this.currentTheme].background.play(),this.backgroundMusic&&this.isBackgroundMusicPlaying&&this.playBackgroundMusic()),console.log(`Audio ${this.isMuted?"muted":"unmuted"}`),this.isMuted}createAudioControls(){const e=document.createElement("div");e.style.cssText=`
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
            background: var(--secondary-bg);
            padding: 10px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            z-index: 100;
        `;const t=document.createElement("button");t.innerHTML=this.isMuted?"🔇":"🔊",t.style.cssText=`
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        `,t.addEventListener("click",()=>{const s=this.toggleMute();t.innerHTML=s?"🔇":"🔊"});const i=document.createElement("input");return i.type="range",i.min="0",i.max="1",i.step="0.1",i.value=this.volume,i.style.cssText=`
            width: 80px;
            accent-color: var(--accent-color);
        `,i.addEventListener("input",s=>{this.setVolume(parseFloat(s.target.value))}),e.appendChild(t),e.appendChild(i),document.body.appendChild(e),e}destroy(){this.audioContext&&this.audioContext.close(),Object.values(this.sounds).forEach(e=>{Object.values(e).forEach(t=>{t.stop()})})}}class E{constructor(){this.achievements={first_wait:{id:"first_wait",name:"First Wait",description:"Complete your first queue",unlocked:!1,condition:"queueCompleted",requirement:1},patience_virtue:{id:"patience_virtue",name:"Patience is a Virtue",description:"Wait for 10 minutes straight",unlocked:!1,condition:"waitTime",requirement:6e5},queue_veteran:{id:"queue_veteran",name:"Queue Veteran",description:"Reach Queue Game 5",unlocked:!1,condition:"queueLevel",requirement:5},stockholm_syndrome:{id:"stockholm_syndrome",name:"Stockholm Syndrome",description:"Restart from Queue 1 voluntarily",unlocked:!1,condition:"queueReset",requirement:1},queue_master:{id:"queue_master",name:"Queue Master",description:"Unlock all queue themes",unlocked:!1,condition:"allQueues",requirement:6},eternal_waiter:{id:"eternal_waiter",name:"Eternal Waiter",description:"Spend 1 hour total in queues",unlocked:!1,condition:"totalWaitTime",requirement:36e5},queue_evangelist:{id:"queue_evangelist",name:"Queue Evangelist",description:"Share the game with others",unlocked:!1,condition:"share",requirement:1},position_jumper:{id:"position_jumper",name:"Position Jumper",description:"Experience 10 queue events",unlocked:!1,condition:"queueEvents",requirement:10},premium_victim:{id:"premium_victim",name:"Premium Victim",description:"Get cut by premium members 5 times",unlocked:!1,condition:"premiumCuts",requirement:5},infinite_loop:{id:"infinite_loop",name:"Infinite Loop",description:"Reach the infinite queue",unlocked:!1,condition:"infiniteQueue",requirement:1},click_master:{id:"click_master",name:"Click Master",description:"Click on 20 advertisements",unlocked:!1,condition:"adClicks",requirement:20},zen_master:{id:"zen_master",name:"Zen Master",description:"Remain calm during 50 position jumps",unlocked:!1,condition:"positionJumps",requirement:50}},this.stats={queuesCompleted:0,totalWaitTime:0,queueEvents:0,premiumCuts:0,adClicks:0,positionJumps:0,maxQueueReached:1,sessionStartTime:Date.now(),visitedQueues:new Set([1])},this.eventListeners={}}init(){this.loadProgress(),console.log("Achievement System initialized"),console.log("Unlocked achievements:",this.getUnlockedAchievements().length)}on(e,t){this.eventListeners[e]||(this.eventListeners[e]=[]),this.eventListeners[e].push(t)}emit(e,t){this.eventListeners[e]&&this.eventListeners[e].forEach(i=>i(t))}checkAchievements(e,t){let i=[];switch(e){case"queueCompleted":this.stats.queuesCompleted++,this.stats.visitedQueues.add(t.theme),this.stats.maxQueueReached=Math.max(this.stats.maxQueueReached,t.level||1),i.push(...this.checkQueueAchievements(t));break;case"queueEvent":this.stats.queueEvents++,t.type==="premium_cut"&&this.stats.premiumCuts++,t.type==="position_jump"&&this.stats.positionJumps++,i.push(...this.checkEventAchievements());break;case"adClick":this.stats.adClicks++,i.push(...this.checkAdAchievements());break;case"waitTime":this.stats.totalWaitTime=t.totalTime,i.push(...this.checkTimeAchievements());break;case"share":i.push(...this.checkShareAchievements());break}i.forEach(s=>{this.unlockAchievement(s.id)}),this.saveProgress()}checkQueueAchievements(e){const t=[];return!this.achievements.first_wait.unlocked&&this.stats.queuesCompleted>=1&&t.push(this.achievements.first_wait),!this.achievements.queue_veteran.unlocked&&this.stats.maxQueueReached>=5&&t.push(this.achievements.queue_veteran),!this.achievements.queue_master.unlocked&&this.stats.visitedQueues.size>=6&&t.push(this.achievements.queue_master),!this.achievements.infinite_loop.unlocked&&e.theme==="infinite"&&t.push(this.achievements.infinite_loop),!this.achievements.stockholm_syndrome.unlocked&&e.level===1&&this.stats.maxQueueReached>3&&t.push(this.achievements.stockholm_syndrome),t}checkEventAchievements(){const e=[];return!this.achievements.position_jumper.unlocked&&this.stats.queueEvents>=10&&e.push(this.achievements.position_jumper),!this.achievements.premium_victim.unlocked&&this.stats.premiumCuts>=5&&e.push(this.achievements.premium_victim),!this.achievements.zen_master.unlocked&&this.stats.positionJumps>=50&&e.push(this.achievements.zen_master),e}checkTimeAchievements(){const e=[],t=Date.now()-this.stats.sessionStartTime;return!this.achievements.patience_virtue.unlocked&&t>=6e5&&e.push(this.achievements.patience_virtue),!this.achievements.eternal_waiter.unlocked&&this.stats.totalWaitTime>=36e5&&e.push(this.achievements.eternal_waiter),e}checkAdAchievements(){const e=[];return!this.achievements.click_master.unlocked&&this.stats.adClicks>=20&&e.push(this.achievements.click_master),e}checkShareAchievements(){const e=[];return this.achievements.queue_evangelist.unlocked||e.push(this.achievements.queue_evangelist),e}unlockAchievement(e){const t=this.achievements[e];!t||t.unlocked||(t.unlocked=!0,console.log(`Achievement unlocked: ${t.name}`),this.showAchievementNotification(t),this.emit("achievementUnlocked",t),this.saveProgress())}showAchievementNotification(e){const t=document.createElement("div");t.className="achievement-notification",t.innerHTML=`
            <div style="font-weight: bold; margin-bottom: 5px;">🏆 Achievement Unlocked!</div>
            <div style="font-size: 1.1em;">${e.name}</div>
            <div style="font-size: 0.9em; opacity: 0.8;">${e.description}</div>
        `,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},3e3)}getUnlockedAchievements(){return Object.values(this.achievements).filter(e=>e.unlocked)}getLockedAchievements(){return Object.values(this.achievements).filter(e=>!e.unlocked)}getAchievementProgress(e){const t=this.achievements[e];if(!t)return 0;if(t.unlocked)return 100;switch(t.condition){case"queueCompleted":return this.stats.queuesCompleted/t.requirement*100;case"queueEvents":return this.stats.queueEvents/t.requirement*100;case"premiumCuts":return this.stats.premiumCuts/t.requirement*100;case"adClicks":return this.stats.adClicks/t.requirement*100;case"totalWaitTime":return this.stats.totalWaitTime/t.requirement*100;case"waitTime":return(Date.now()-this.stats.sessionStartTime)/t.requirement*100;default:return 0}}triggerShare(){this.checkAchievements("share");const e="I'm stuck in an infinite queue! Help me by joining Queue Game: ",t=window.location.href;navigator.share?navigator.share({title:"Queue Game",text:e,url:t}).catch(i=>{console.log("Share cancelled or failed:",i),this.fallbackShare(e+t)}):this.fallbackShare(e+t)}fallbackShare(e){navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(e).then(()=>{alert("Share link copied to clipboard!")}).catch(t=>{console.log("Clipboard access denied:",t),this.manualShare(e)}):this.manualShare(e)}manualShare(e){const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();try{document.execCommand("copy"),alert("Share link copied! Paste it wherever you want to share.")}catch(i){console.log("Manual copy failed:",i),prompt("Copy this share link:",e)}document.body.removeChild(t)}triggerAdClick(){this.checkAchievements("adClick")}saveProgress(){try{const e={achievements:this.achievements,stats:{...this.stats,visitedQueues:Array.from(this.stats.visitedQueues)}};localStorage.setItem("queueSimulatorAchievements",JSON.stringify(e))}catch(e){console.warn("Failed to save achievements:",e)}}loadProgress(){try{const e=localStorage.getItem("queueSimulatorAchievements");if(e){const t=JSON.parse(e);t.achievements&&Object.keys(t.achievements).forEach(i=>{this.achievements[i]&&(this.achievements[i].unlocked=t.achievements[i].unlocked)}),t.stats&&(this.stats={...this.stats,...t.stats,visitedQueues:new Set(t.stats.visitedQueues||[1]),sessionStartTime:Date.now()})}}catch(e){console.warn("Failed to load achievements:",e)}}resetProgress(){Object.values(this.achievements).forEach(e=>{e.unlocked=!1}),this.stats={queuesCompleted:0,totalWaitTime:0,queueEvents:0,premiumCuts:0,adClicks:0,positionJumps:0,maxQueueReached:1,sessionStartTime:Date.now(),visitedQueues:new Set([1])},this.saveProgress(),console.log("Achievement progress reset")}}class A{constructor(){this.currentTheme="basic",this.themes={basic:{name:"Basic Terminal",description:"Classic green-on-black queue experience",className:"theme-basic"},fancy:{name:"Corporate Premium",description:"Sophisticated waiting for sophisticated people",className:"theme-fancy"},action:{name:"Military Operation",description:"High-stakes queue combat zone",className:"theme-action"},space:{name:"Galactic Queue",description:"Waiting among the stars",className:"theme-space"},battle:{name:"Queue Royale",description:"Battle for queue supremacy",className:"theme-battle"},mystical:{name:"Zen Enlightenment",description:"Find peace through infinite waiting",className:"theme-mystical"},infinite:{name:"Matrix Protocol",description:"Welcome to the infinite loop",className:"theme-infinite"}},this.transitionDuration=1e3}init(){this.applyTheme("basic"),console.log("Theme Manager initialized")}setTheme(e){if(!this.themes[e]){console.warn(`Theme '${e}' not found`);return}e!==this.currentTheme&&(console.log(`Switching theme from '${this.currentTheme}' to '${e}'`),document.body.classList.add("theme-transition"),setTimeout(()=>{this.applyTheme(e),setTimeout(()=>{document.body.classList.remove("theme-transition")},this.transitionDuration)},this.transitionDuration/4))}applyTheme(e){const t=this.themes[e];t&&(Object.values(this.themes).forEach(i=>{document.body.classList.remove(i.className)}),document.body.classList.add(t.className),this.updateQueueTitle(e),this.currentTheme=e)}updateQueueTitle(e){const t=document.getElementById("queue-title"),i=document.getElementById("queue-message");if(t&&i)switch(this.themes[e],e){case"basic":t.textContent="Queue Game",i.textContent="Welcome to the queue! Please wait patiently.";break;case"fancy":t.textContent="Queue Game 2: The Queuening",i.textContent="Thank you for choosing our premium waiting experience.";break;case"action":t.textContent="QUEUE GAME 3: QUEUE HARD",i.textContent="PREPARE FOR EXTREME QUEUE COMBAT!";break;case"space":t.textContent="Queue Game 4: Queue Wars",i.textContent="Intergalactic queue protocols engaged...";break;case"battle":t.textContent="Queue Game 5: Queue Royale",i.textContent="Battle for position supremacy has begun!";break;case"mystical":t.textContent="Queue Game 6: The Queue Awakens",i.textContent="Find enlightenment through the art of waiting...";break;case"infinite":t.textContent="Queue Game ∞",i.textContent="W3LC0M3 T0 TH3 1NF1N1T3 L00P...";break}}getCurrentTheme(){return this.themes[this.currentTheme]}getThemeInfo(e){return this.themes[e]||null}getAllThemes(){return{...this.themes}}addParticleEffects(e){switch(this.clearParticleEffects(),e){case"space":this.createStarField();break;case"mystical":this.createFloatingOrbs();break;case"infinite":this.createMatrixRain();break}}clearParticleEffects(){document.querySelectorAll(".particle").forEach(t=>t.remove()),this.particleInterval&&clearInterval(this.particleInterval)}createStarField(){const e=()=>{const t=document.createElement("div");t.className="particle star",t.style.cssText=`
                position: fixed;
                width: 2px;
                height: 2px;
                background: #ffffff;
                border-radius: 50%;
                top: ${Math.random()*100}vh;
                left: ${Math.random()*100}vw;
                animation: twinkle 2s infinite;
                pointer-events: none;
                z-index: -1;
            `,document.body.appendChild(t),setTimeout(()=>t.remove(),4e3)};for(let t=0;t<20;t++)setTimeout(()=>e(),t*100);this.particleInterval=setInterval(e,500)}createFloatingOrbs(){const e=()=>{const t=document.createElement("div");t.className="particle orb",t.style.cssText=`
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #daa520, transparent);
                border-radius: 50%;
                bottom: -10px;
                left: ${Math.random()*100}vw;
                animation: floatUp 8s linear infinite;
                pointer-events: none;
                z-index: -1;
                opacity: 0.7;
            `,document.body.appendChild(t),setTimeout(()=>t.remove(),8e3)};this.particleInterval=setInterval(e,1e3)}createMatrixRain(){const e="01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",t=()=>{const i=document.createElement("div");i.className="particle matrix-char",i.textContent=e[Math.floor(Math.random()*e.length)],i.style.cssText=`
                position: fixed;
                color: #00ff41;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                top: -20px;
                left: ${Math.random()*100}vw;
                animation: matrixFall 3s linear infinite;
                pointer-events: none;
                z-index: -1;
                opacity: 0.8;
            `,document.body.appendChild(i),setTimeout(()=>i.remove(),3e3)};this.particleInterval=setInterval(t,100)}addAnimationStyles(){if(document.getElementById("theme-animations"))return;const e=document.createElement("style");e.id="theme-animations",e.textContent=`
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }

            @keyframes floatUp {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.7; }
                90% { opacity: 0.7; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }

            @keyframes matrixFall {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `,document.head.appendChild(e)}setThemeWithEffects(e){this.setTheme(e),setTimeout(()=>{this.addParticleEffects(e)},this.transitionDuration)}destroy(){this.clearParticleEffects();const e=document.getElementById("theme-animations");e&&e.remove()}}const q=[{id:1,title:"Queue Game Reaches 1 Million Players",content:"The revolutionary waiting experience has captivated audiences worldwide. 'It's like real life, but more frustrating,' says one satisfied customer.",category:"milestone",timestamp:"2024-12-15T10:30:00Z"},{id:2,title:"New Queue Skip Pro™ Features Announced",content:"Premium members can now skip to position 49,999 instead of 50,000! Scientists are calling it 'technically an improvement.'",category:"product",timestamp:"2024-12-14T15:45:00Z"},{id:3,title:"Local Man Achieves Queue Enlightenment",content:"After 47 hours in Queue Game, Jerry from Ohio reports: 'I no longer feel the passage of time. This is either transcendence or a medical emergency.'",category:"community",timestamp:"2024-12-13T09:20:00Z"},{id:4,title:"Queue Anxiety Pills Show Promising Results",content:"Clinical trials reveal 73% of users report reduced anxiety while waiting. Side effects may include increased patience and existential dread.",category:"health",timestamp:"2024-12-12T14:15:00Z"},{id:5,title:"Breaking: Queue Position Algorithms Updated",content:"Our advanced AI now calculates wait times with 15% more uncertainty. 'Chaos is the natural order,' explains Lead Queue Engineer.",category:"technology",timestamp:"2024-12-11T11:00:00Z"},{id:6,title:"Queue Dating App Launches Today",content:"Meet other people who are also waiting! Premium feature: See who's ahead of you in line. Perfect for long-distance queue relationships.",category:"lifestyle",timestamp:"2024-12-10T16:30:00Z"},{id:7,title:"Study: Waiting Builds Character",content:"Researchers confirm that standing in virtual queues increases patience by 300%. Character building has never been this inefficient!",category:"science",timestamp:"2024-12-09T08:45:00Z"},{id:8,title:"Queue Real Estate Market Booming",content:"Premium queue positions now selling for $50k. 'Location, location, location,' says realtor. 'Position 42 has excellent wait time potential.'",category:"business",timestamp:"2024-12-08T13:20:00Z"},{id:9,title:"Queue University Offers New Degree",content:"Bachelor's in Applied Waiting Studies now available! Four-year program includes advanced standing, line theory, and queue psychology.",category:"education",timestamp:"2024-12-07T10:10:00Z"},{id:10,title:"Queue Mouse™ Prevents RSI",content:"Ergonomic mouse designed for extended waiting sessions. Features include stress ball attachment and built-in timer for existential contemplation.",category:"product",timestamp:"2024-12-06T17:55:00Z"},{id:11,title:"Queue Insurance Now Available",content:"Protect your position with comprehensive queue insurance! Coverage includes position theft, line cuts, and acts of queue gods.",category:"business",timestamp:"2024-12-05T12:40:00Z"},{id:12,title:"Meditation Queue App Gains Popularity",content:"Find inner peace while waiting with guided meditation. 'Embrace the void of uncertainty,' teaches Queue Guru Master Chen.",category:"wellness",timestamp:"2024-12-04T14:25:00Z"},{id:13,title:"Government Considers Queue Regulations",content:"Congress debates Queue Safety Act after reports of 'extreme waiting fatigue.' Proposed 72-hour maximum queue time called 'unrealistic.'",category:"politics",timestamp:"2024-12-03T09:15:00Z"},{id:14,title:"Queue Speedrun Record Broken",content:"Gamer completes Queue Game in record 0.3 seconds using exploits. 'I accidentally clicked the wrong button,' admits champion.",category:"gaming",timestamp:"2024-12-02T19:30:00Z"},{id:15,title:"Virtual Queue Therapy Sessions Available",content:"Professional therapists now offer support for queue-related trauma. 'It's okay to feel frustrated,' reassures Dr. Waitington.",category:"health",timestamp:"2024-12-01T11:50:00Z"},{id:16,title:"Queue Olympics Announced for 2025",content:"International Queue Olympics to feature standing, waiting, and advanced line-formation events. 'May the longest wait win,' says organizer.",category:"sports",timestamp:"2024-11-30T14:20:00Z"},{id:17,title:"AI Predicts Queue Behavior with 99% Accuracy",content:"Machine learning algorithm can predict when you'll give up waiting. 'Humans are surprisingly predictable,' notes lead researcher.",category:"technology",timestamp:"2024-11-29T16:45:00Z"},{id:18,title:"Queue Cafe Opens in Downtown",content:"New restaurant where you wait to wait for your food. 'We're revolutionizing the dining experience by adding more queues,' says chef.",category:"lifestyle",timestamp:"2024-11-28T10:30:00Z"},{id:19,title:"Queue Etiquette Classes Now Mandatory",content:"Schools nationwide implement queue behavior curriculum. Subjects include 'Advanced Line Cutting Defense' and 'Patience Through Suffering.'",category:"education",timestamp:"2024-11-27T13:15:00Z"},{id:20,title:"Breaking: Queue Length Record Shattered",content:"Virtual queue reaches 2.5 million people waiting for nothing in particular. 'It's about the journey, not the destination,' explains participant.",category:"milestone",timestamp:"2024-11-26T09:40:00Z"},{id:21,title:"Queue Weather Report: Heavy Waiting Expected",content:"Meteorologists predict 73% chance of extended wait times with occasional bursts of forward movement. Umbrella recommended for outdoor queues.",category:"general",timestamp:"2024-11-25T07:25:00Z"},{id:22,title:"Queue Subscription Service Launches",content:"Monthly fee gets you access to premium waiting experiences. 'Why wait for free when you can pay to wait better?' asks CEO.",category:"business",timestamp:"2024-11-24T15:50:00Z"},{id:23,title:"Local Queue Achieves Sentience",content:"Queue #47 reportedly began making its own decisions about who moves forward. 'It's become quite opinionated,' says confused administrator.",category:"science",timestamp:"2024-11-23T12:35:00Z"},{id:24,title:"Queue-to-Queue Transportation Invented",content:"Revolutionary technology allows instant transfer between queues. 'Now you can wait in multiple lines simultaneously!' celebrates inventor.",category:"technology",timestamp:"2024-11-22T18:10:00Z"},{id:25,title:"Queue Gaming Championship Finals Tonight",content:"Top players compete in professional queue navigation. Prize money reaches $50,000 for mastering the art of efficient waiting.",category:"gaming",timestamp:"2024-11-21T20:45:00Z"},{id:26,title:"Queue Anonymous Support Groups Form",content:"'Hi, I'm Bob, and I'm addicted to waiting in lines.' Support groups help people overcome compulsive queue-joining behavior.",category:"health",timestamp:"2024-11-20T11:20:00Z"},{id:27,title:"Queue Fashion Week Showcases Latest Trends",content:"Designers present cutting-edge waiting attire. This season's must-have: ergonomic standing shoes and patience-enhancing jewelry.",category:"lifestyle",timestamp:"2024-11-19T14:55:00Z"},{id:28,title:"Government Declares National Queue Day",content:"Annual celebration honors the noble art of waiting. Citizens encouraged to form spontaneous lines for no particular reason.",category:"politics",timestamp:"2024-11-18T08:30:00Z"},{id:29,title:"Queue Ghost Sightings Increase",content:"Paranormal investigators report spirits of people who died waiting still holding their place in line. 'They're very polite,' notes expert.",category:"general",timestamp:"2024-11-17T22:15:00Z"},{id:30,title:"Queue Yoga Becomes Popular Exercise",content:"New fitness trend combines meditation with standing in line. 'Achieve inner peace while maintaining your position,' teaches instructor.",category:"wellness",timestamp:"2024-11-16T17:40:00Z"},{id:31,title:"Scientific Study: Queues Affect Time Perception",content:"Researchers discover waiting in line literally slows down time. 'Five minutes feels like hours, it's not just in your head,' confirms physicist.",category:"science",timestamp:"2024-11-15T13:25:00Z"},{id:32,title:"Queue Travel Agency Opens Bookings",content:"Vacation packages feature world's most scenic waiting areas. 'Experience the Swiss Alps while standing in line for 8 hours!' advertises brochure.",category:"lifestyle",timestamp:"2024-11-14T10:50:00Z"},{id:33,title:"Queue Archaeology Uncovers Ancient Lines",content:"Scientists discover 5,000-year-old queue preserved in ice. 'They were waiting for something called 'iPhone 1,' notes confused archaeologist.",category:"science",timestamp:"2024-11-13T16:35:00Z"},{id:34,title:"Queue Music Genre Gains Popularity",content:"New musical style captures the rhythm of waiting. Top hit: 'Standing Still (For 3 Hours)' by The Line Dancers reaches #1.",category:"lifestyle",timestamp:"2024-11-12T19:20:00Z"},{id:35,title:"Queue Detective Solves Line-Cutting Mystery",content:"Private investigator specializing in queue crimes catches serial line-cutter. 'Justice served, one position at a time,' declares detective.",category:"general",timestamp:"2024-11-11T12:45:00Z"},{id:36,title:"Queue Banking: Earn Interest While Waiting",content:"Revolutionary financial service pays customers for time spent in queues. 'Turn your waiting time into winning time!' promises bank president.",category:"business",timestamp:"2024-11-10T15:10:00Z"},{id:37,title:"Queue Philosopher Publishes New Theory",content:"'To Wait or Not to Wait: The Queue Dilemma' explores existential meaning of lines. 'We are all just waiting for something,' reflects author.",category:"education",timestamp:"2024-11-09T11:30:00Z"},{id:38,title:"Queue Energy: Harvesting Power from Impatience",content:"Scientists convert frustrated sighs and foot-tapping into electricity. 'Peak energy production occurs around hour 3 of waiting,' reports team.",category:"technology",timestamp:"2024-11-08T14:25:00Z"},{id:39,title:"Queue Cooking Show Premieres Tonight",content:"'Waiting for Gordon' features celebrity chef teaching patience through extended preparation times. 'A watched pot never boils, but we'll wait anyway!'",category:"lifestyle",timestamp:"2024-11-07T18:55:00Z"},{id:40,title:"Queue Time Machine Invented",content:"Device allows you to experience historical queues from different eras. 'Now you can wait like it's 1999!' exclaims time-traveling queue enthusiast.",category:"technology",timestamp:"2024-11-06T21:40:00Z"},{id:41,title:"Queue Whisperer Offers Professional Services",content:"Expert can communicate with angry queues to calm them down. 'Every line has feelings, you just need to listen,' explains queue psychologist.",category:"general",timestamp:"2024-11-05T09:15:00Z"},{id:42,title:"Queue Awards Ceremony Honors Longest Waiters",content:"Annual gala celebrates those who waited the most. Lifetime Achievement Award goes to woman who's been in line since 1987 for concert tickets.",category:"milestone",timestamp:"2024-11-04T20:30:00Z"}];function I(r=5){return q.sort((e,t)=>new Date(t.timestamp)-new Date(e.timestamp)).slice(0,r)}class Q{constructor(){this.newsItems=[],this.currentNewsIndex=0,this.newsElement=null,this.rotationInterval=null,this.isActive=!1}async init(){if(this.newsElement=document.getElementById("news-ticker"),!this.newsElement){console.warn("News ticker element not found");return}this.loadNews(),this.newsItems.length>0?(this.showCurrentNews(),o.news.autoStart&&this.startRotation()):console.log("No news items available"),console.log(`News system initialized with ${this.newsItems.length} items`)}loadNews(){this.newsItems=I(o.news.maxItems),o.ui.showDebugLogs&&console.log(`Loaded ${this.newsItems.length} news items`)}showCurrentNews(){if(!this.newsElement||this.newsItems.length===0)return;const e=this.newsItems[this.currentNewsIndex];o.news.fadeTransition&&this.newsElement.classList.add("news-fading-out"),setTimeout(()=>{this.displayNewsItem(e),o.news.fadeTransition&&(this.newsElement.classList.remove("news-fading-out"),this.newsElement.classList.add("news-fading-in"),setTimeout(()=>{this.newsElement.classList.remove("news-fading-in")},300))},o.news.fadeTransition?200:0)}displayNewsItem(e){if(!e)return;const t=this.getTimeAgo(e.timestamp),i=this.getCategoryIcon(e.category);this.newsElement.innerHTML=`
            <div class="news-item" style="
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 15px;
                background: rgba(20, 20, 20, 0.95);
                border: 1px solid rgba(0, 204, 170, 0.3);
                border-left: 4px solid var(--accent-color);
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            ">
                <div class="news-icon" style="
                    font-size: 1.2em;
                    margin-top: 2px;
                    min-width: 20px;
                ">${i}</div>

                <div class="news-content" style="flex: 1;">
                    <div class="news-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 8px;
                        gap: 10px;
                    ">
                        <h4 class="news-title" style="
                            color: var(--accent-color);
                            margin: 0;
                            font-size: 1em;
                            font-weight: bold;
                            line-height: 1.3;
                            flex: 1;
                        ">${e.title}</h4>

                        ${o.news.showTimestamp?`
                            <span class="news-time" style="
                                color: #aaaaaa;
                                font-size: 0.8em;
                                white-space: nowrap;
                                margin-top: 2px;
                                font-weight: 300;
                            ">${t}</span>
                        `:""}
                    </div>

                    <p class="news-text" style="
                        color: #ffffff;
                        margin: 0;
                        line-height: 1.4;
                        font-size: 0.9em;
                        text-shadow: 0 1px 2px rgba(0,0,0,0.8);
                        font-weight: 400;
                    ">${e.content}</p>

                    <div class="news-countdown" style="
                        margin-top: 10px;
                        font-size: 0.75em;
                        color: #888888;
                        font-style: italic;
                    ">Next update in ${Math.floor(o.news.rotationIntervalMs/1e3)} seconds</div>
                </div>
            </div>
        `}getCategoryIcon(e){const t={milestone:"🏆",product:"📦",community:"👥",health:"💊",technology:"⚙️",lifestyle:"💝",science:"🔬",business:"💼",education:"🎓",wellness:"🧘",politics:"🏛️",gaming:"🎮",sports:"⚽",general:"📰"};return t[e]||t.general}getTimeAgo(e){const t=new Date,i=new Date(e),s=t-i,n=Math.floor(s/(1e3*60*60*24)),a=Math.floor(s/(1e3*60*60)),u=Math.floor(s/(1e3*60));return n>0?`${n}d ago`:a>0?`${a}h ago`:u>0?`${u}m ago`:"Just now"}nextNews(){const e=Math.floor(Math.random()*this.newsItems.length);this.newsItems.length>1&&e===this.currentNewsIndex?this.currentNewsIndex=(e+1)%this.newsItems.length:this.currentNewsIndex=e,this.showCurrentNews()}previousNews(){this.currentNewsIndex=(this.currentNewsIndex-1+this.newsItems.length)%this.newsItems.length,this.showCurrentNews()}startRotation(){this.rotationInterval&&clearInterval(this.rotationInterval),this.isActive=!0,this.rotationInterval=setInterval(()=>{this.nextNews()},o.news.rotationIntervalMs),o.ui.showDebugLogs&&console.log(`News rotation started (${o.news.rotationIntervalMs}ms interval)`)}stopRotation(){this.rotationInterval&&(clearInterval(this.rotationInterval),this.rotationInterval=null),this.isActive=!1,o.ui.showDebugLogs&&console.log("News rotation stopped")}refreshNews(){this.stopRotation(),this.loadNews(),this.newsItems.length>0&&(this.currentNewsIndex=0,this.showCurrentNews(),this.startRotation()),console.log("News feed refreshed")}destroy(){this.stopRotation(),this.newsElement&&(this.newsElement.innerHTML="")}}class y{constructor(){this.queueSimulator=new f,this.adSystem=new C,this.audioManager=new M,this.achievementSystem=new E,this.themeManager=new A,this.newsSystem=new Q,this.isInitialized=!1,this.cheatBuffer="",this.cheatCodes={iddqd:()=>this.activateCheat()}}async init(){if(!this.isInitialized)try{await this.audioManager.init(),await this.adSystem.init(),await this.newsSystem.init(),this.achievementSystem.init(),this.themeManager.init(),this.bindStartScreen(),this.isInitialized=!0,console.log("Queue Game initialized successfully - waiting for user to start")}catch(e){console.error("Failed to initialize Queue Game:",e)}}bindStartScreen(){var t;const e=document.getElementById("play-button");e&&e.addEventListener("click",()=>{this.startGame()}),(t=document.getElementById("contact-button"))==null||t.addEventListener("click",()=>{this.openContactEmail()})}startGame(){const e=document.getElementById("start-screen"),t=document.getElementById("queue-container");e&&t&&(e.style.display="none",t.style.display="block"),this.audioManager.playBackgroundMusic(),this.queueSimulator.init(),this.bindEvents(),this.startGameLoop(),this.updatePositionDisplay(this.queueSimulator.state.position),this.updateWaitTimeDisplay(this.queueSimulator.state.waitTime),this.updateAchievementDisplay(),this.bindCheatCodes(),console.log("Game started!")}bindEvents(){this.queueSimulator.on("positionChanged",e=>{this.updatePositionDisplay(e)}),this.queueSimulator.on("waitTimeChanged",e=>{this.updateWaitTimeDisplay(e)}),this.queueSimulator.on("queueCompleted",e=>{this.handleQueueCompletion(e)}),this.queueSimulator.on("queueEvent",e=>{this.handleQueueEvent(e)}),this.queueSimulator.on("showCompletionScreen",e=>{this.showQueueCompletionScreen(e)}),this.achievementSystem.on("achievementUnlocked",e=>{this.updateAchievementDisplay()}),this.bindUIControls(),window.gameAchievements=this.achievementSystem}bindUIControls(){var e,t,i,s,n;(e=document.getElementById("share-button"))==null||e.addEventListener("click",()=>{this.achievementSystem.triggerShare()}),(t=document.getElementById("premium-button"))==null||t.addEventListener("click",()=>{const a=this.queueSimulator.buyQueueSkip();this.showPremiumResult(a)}),(i=document.getElementById("config-button"))==null||i.addEventListener("click",()=>{this.showConfigPanel()}),(s=document.getElementById("reset-button"))==null||s.addEventListener("click",()=>{this.showResetConfirmation()}),(n=document.getElementById("contact-button-game"))==null||n.addEventListener("click",()=>{this.openContactEmail()})}startGameLoop(){const e=()=>{this.queueSimulator.update(),this.adSystem.update(),requestAnimationFrame(e)};e()}updatePositionDisplay(e){const t=document.getElementById("current-position");t&&(t.textContent=e.toLocaleString())}updateWaitTimeDisplay(e){const t=document.getElementById("current-wait-time");t&&(t.textContent=e)}handleQueueCompletion(e){console.log(`Queue completed! Moving to: ${e.name}`),this.themeManager.setTheme(e.theme),this.achievementSystem.checkAchievements("queueCompleted",e)}handleQueueEvent(e){console.log("Queue event:",e),this.achievementSystem.checkAchievements("queueEvent",e)}updateAchievementDisplay(){const e=this.achievementSystem.getUnlockedAchievements().length,t=Object.keys(this.achievementSystem.achievements).length,i=document.getElementById("achievement-count");i&&(i.textContent=`(${e}/${t})`);const s=document.getElementById("achievements-list");s&&(s.innerHTML="",Object.values(this.achievementSystem.achievements).forEach(n=>{const a=document.createElement("div");a.className=n.unlocked?"achievement-item unlocked":"achievement-item locked",a.title=n.description,a.textContent=n.unlocked?`✓ ${n.name}`:`○ ${n.name}`,s.appendChild(a)})),this.updateStatistics()}updateStatistics(){const e=this.achievementSystem.stats;document.getElementById("stat-queues").textContent=e.queuesCompleted,document.getElementById("stat-events").textContent=e.queueEvents,document.getElementById("stat-clicks").textContent=e.adClicks;const t=Math.floor(e.totalWaitTime/6e4),i=Math.floor(t/60),s=t%60;let n="";i>0?n=`${i}h ${s}m`:n=`${s}m`,document.getElementById("stat-time").textContent=n}showPremiumResult(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffd700, #ffaa00);
            color: #000;
            border: 3px solid #ffaa00;
            padding: 25px;
            border-radius: 12px;
            z-index: 1000;
            text-align: center;
            max-width: 350px;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
            font-weight: bold;
        `,t.innerHTML=`
            <h3 style="margin-bottom: 15px; color: #000;">💎 Queue Skip Pro™</h3>
            <p style="margin-bottom: 15px;">${e.message}</p>
            <p style="font-size: 0.8em; font-style: italic; margin-bottom: 20px;">
                Processing payment... Optimizing queue position...
            </p>
            <button style="
                padding: 10px 20px;
                background: #000;
                color: #ffd700;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-family: inherit;
                font-weight: bold;
            ">OK</button>
        `,document.body.appendChild(t);const i=()=>t.remove();t.querySelector("button").addEventListener("click",i),setTimeout(i,5e3)}showResetConfirmation(){const e=document.createElement("div");e.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 2px solid #ff4444;
            padding: 25px;
            border-radius: 8px;
            z-index: 1000;
            text-align: center;
            max-width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `,e.innerHTML=`
            <h3 style="color: #ff4444; margin-bottom: 15px;">⚠️ Reset Progress</h3>
            <p style="margin-bottom: 20px;">Are you sure you want to reset all progress? This will:</p>
            <ul style="text-align: left; margin-bottom: 20px; color: var(--text-secondary);">
                <li>Reset your queue position</li>
                <li>Clear all achievements</li>
                <li>Reset statistics</li>
                <li>Clear saved progress</li>
            </ul>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="confirm-reset" style="
                    padding: 8px 16px;
                    background: #ff4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: inherit;
                ">Reset</button>
                <button id="cancel-reset" style="
                    padding: 8px 16px;
                    background: var(--border-color);
                    color: var(--text-primary);
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: inherit;
                ">Cancel</button>
            </div>
        `,document.body.appendChild(e);const t=()=>e.remove();e.querySelector("#confirm-reset").addEventListener("click",()=>{this.resetAllProgress(),t()}),e.querySelector("#cancel-reset").addEventListener("click",t)}async resetAllProgress(){this.queueSimulator.destroy(),localStorage.removeItem("queueSimulatorState"),localStorage.removeItem("queueSimulatorAchievements"),Object.keys(localStorage).forEach(i=>{i.toLowerCase().includes("queue")&&localStorage.removeItem(i)}),this.achievementSystem.resetProgress();const{QueueSimulator:e}=await x(async()=>{const{QueueSimulator:i}=await Promise.resolve().then(()=>S);return{QueueSimulator:i}},void 0,import.meta.url);this.queueSimulator=new e,this.queueSimulator.state.currentQueue=1,this.queueSimulator.state.position=Math.floor(Math.random()*(o.queue.initialPositionMax-o.queue.initialPositionMin))+o.queue.initialPositionMin,this.queueSimulator.state.waitTime=this.queueSimulator.calculateFakeWaitTime(),this.queueSimulator.init(),console.log("Reset complete - Queue level:",this.queueSimulator.state.currentQueue,"Position:",this.queueSimulator.state.position),this.themeManager.setTheme("basic");const t=document.getElementById("achievements-list");t&&(t.innerHTML=""),this.updateAchievementDisplay(),this.updatePositionDisplay(this.queueSimulator.state.position),this.updateWaitTimeDisplay(this.queueSimulator.state.waitTime),this.bindEvents(),console.log("All progress reset")}showConfigPanel(){const e=document.createElement("div");e.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 2px solid var(--accent-color);
            padding: 25px;
            border-radius: 12px;
            z-index: 1000;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `,e.innerHTML=`
            <h3 style="color: var(--accent-color); margin-bottom: 20px; text-align: center;">🎵 Music Settings</h3>

            <div style="margin-bottom: 25px; text-align: center;">
                <label style="display: block; margin-bottom: 10px; color: var(--text-primary); font-size: 1.1em;">Background Music Volume:</label>
                <input type="range" id="config-music-volume" value="${window.gameConfig.audio.backgroundMusicVolume}"
                       min="0" max="1" step="0.1" style="width: 100%; margin-bottom: 10px;">
                <span style="color: var(--accent-color); font-size: 1.2em; font-weight: bold;">${Math.round(window.gameConfig.audio.backgroundMusicVolume*100)}%</span>
            </div>

            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="close-config" style="
                    padding: 10px 25px;
                    background: var(--accent-color);
                    color: var(--primary-bg);
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: inherit;
                    font-weight: bold;
                ">Close</button>
            </div>
        `,document.body.appendChild(e),e.querySelector("#config-music-volume").addEventListener("input",s=>{const n=s.target.nextElementSibling;n.textContent=Math.round(s.target.value*100)+"%",window.updateConfig("audio","backgroundMusicVolume",parseFloat(s.target.value)),this.audioManager.backgroundMusic&&(this.audioManager.backgroundMusic.volume=parseFloat(s.target.value))});const i=()=>e.remove();e.querySelector("#close-config").addEventListener("click",i)}bindCheatCodes(){document.addEventListener("keydown",e=>{this.cheatBuffer+=e.key.toLowerCase(),this.cheatBuffer.length>10&&(this.cheatBuffer=this.cheatBuffer.slice(-10));for(const[t,i]of Object.entries(this.cheatCodes))if(this.cheatBuffer.includes(t)){this.cheatBuffer="",i();break}})}activateCheat(){const e=this.queueSimulator.getCurrentQueue();this.queueSimulator.state.position=0,this.updatePositionDisplay(0),this.queueSimulator.updateQueuePosition(),this.showCheatMessage(),console.log(`🎮 CHEAT ACTIVATED: Completed ${e.name} instantly`)}showCheatMessage(){const e=document.createElement("div");e.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff0000, #ff6600);
            color: white;
            border: 3px solid #ffaa00;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 3000;
            text-align: center;
            max-width: 250px;
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
            font-weight: bold;
            animation: pulse 0.5s ease-in-out;
        `,e.innerHTML=`
            <div style="font-size: 1em;">🎮 IDDQD ACTIVATED!</div>
            <div style="font-size: 0.8em; margin-top: 5px;">Skipping queue...</div>
        `,document.body.appendChild(e),setTimeout(()=>{e.remove()},2e3)}showQueueCompletionScreen(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: var(--text-primary);
            animation: fadeIn 0.5s ease-in;
        `,t.innerHTML=`
            <div style="max-width: 600px; padding: 40px;">
                <h1 style="color: var(--accent-color); font-size: 3em; margin-bottom: 20px; text-shadow: 0 0 20px var(--accent-color);">
                    🎉 Congratulations!
                </h1>

                <h2 style="font-size: 1.8em; margin-bottom: 30px; color: var(--text-primary);">
                    Thank you for waiting in ${e.name}!
                </h2>

                <div style="background: var(--secondary-bg); padding: 30px; border-radius: 12px; border: 2px solid var(--accent-color); margin: 30px 0;">
                    <p style="font-size: 1.3em; margin-bottom: 20px; color: var(--accent-color);">
                        🎮 Your patience has been rewarded!
                    </p>
                    <p style="font-size: 1.1em; margin-bottom: 15px;">
                        The game is now loading...
                    </p>
                    <div style="margin: 20px 0;">
                        <div id="loading-bar" style="width: 100%; height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden;">
                            <div id="loading-fill" style="height: 100%; background: var(--accent-color); width: 0%; transition: width 8s ease;"></div>
                        </div>
                    </div>
                    <p style="font-size: 0.9em; color: var(--text-secondary);">
                        Please wait while we prepare your experience...
                    </p>
                </div>
            </div>
        `,document.body.appendChild(t),setTimeout(()=>{const i=t.querySelector("#loading-fill");i.style.width="100%"},100),setTimeout(()=>{this.advanceToNextQueueManual(e),t.remove()},9e3)}advanceToNextQueueManual(e){const t=this.queueSimulator.state.currentQueue;let i;t<6?i=t+1:t===6?i=999:i=1,this.queueSimulator.state.currentQueue=i,this.queueSimulator.state.position=Math.floor(Math.random()*(o.queue.initialPositionMax-o.queue.initialPositionMin))+o.queue.initialPositionMin,this.queueSimulator.state.waitTime=this.queueSimulator.calculateFakeWaitTime(),this.queueSimulator.state.queueTheme=this.queueSimulator.getCurrentQueue().theme,this.queueSimulator.state.isActive=!0,this.queueSimulator.state.isCompleting=!1,this.updatePositionDisplay(this.queueSimulator.state.position),this.updateWaitTimeDisplay(this.queueSimulator.state.waitTime);const s=this.queueSimulator.getCurrentQueue();this.themeManager.setTheme(s.theme),this.achievementSystem.checkAchievements("queueLevel",i),this.queueSimulator.saveState(),console.log(`Advanced to ${s.name}`)}openContactEmail(){const e="sagarikagames@protonmail.com",s=`mailto:${e}?subject=${encodeURIComponent("Queue Game - Contact")}&body=${encodeURIComponent(`Hello Sagarika Games,

I wanted to reach out about Queue Game.

`)}`;try{window.open(s,"_blank")}catch{navigator.clipboard.writeText(e).then(()=>{this.showContactInfo(e)}).catch(()=>{this.showContactInfo(e)})}}showContactInfo(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--secondary-bg);
            border: 3px solid var(--accent-color);
            padding: 30px;
            border-radius: 15px;
            z-index: 1000;
            max-width: 450px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.7);
            text-align: center;
        `,t.innerHTML=`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px;">
                <img src="./assets/images/sagarika_games_text.png" alt="Sagarika Games" style="height: 30px; width: auto; filter: drop-shadow(0 0 5px rgba(0, 204, 255, 0.4));">
                <h2 style="color: var(--accent-color); margin: 0; font-size: 1.2em;">Contact Us</h2>
            </div>
            <p style="color: var(--text-primary); margin-bottom: 20px; line-height: 1.6;">
                📧 Email: <strong style="color: var(--accent-color);">${e}</strong><br>
                <small style="color: var(--text-secondary);">Email address copied to clipboard!</small>
            </p>
            <button id="contact-popup-ok" style="
                padding: 12px 25px;
                background: var(--accent-color);
                color: var(--primary-bg);
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: inherit;
                font-weight: bold;
                font-size: 1.1em;
                box-shadow: 0 4px 12px rgba(0, 204, 255, 0.4);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">Got it!</button>
        `,document.body.appendChild(t),t.addEventListener("click",()=>{t.remove()})}}document.addEventListener("DOMContentLoaded",()=>{new y().init()});window.QueueGame=y;
//# sourceMappingURL=index-Bcqw8bKg.js.map
