
let termsMini = [["pipe"]];

let termsBody    = ['panasonic lumix gh4 body', 'panasonic lumix gh5 body', 'canon xc10 body', 'canon c100 camera body', 'canon c200 camera body', 'canon c300 camera body', 'canon mark IV body', 'canon 80D body', 'canon M50 body', 'canon eos-1d x mark body'];
let termsBody3 = ['sony fs5 camera', 'sony fs7 camera', 'black magic cinema camera', 'black magic ursa mini camera'];
let termsBody5 = ['red dragon camera body', 'red camera digital cinema', 'Fujifilm X-T20 body', 'Fujifilm X-T3 body'];
let termsCameras = {termsBody, termsBody3, termsBody5};

let termsLenses1  = ["ef mount lens", "Parfocal Lens", "Cine lens", 'micro four thirds lens', 'SLR Magic lens', 'cinema prime lens'];
let termsLenses  = {termsLenses1};


let termsLights1  = ["godox video light", 'video studio lighting', 'LED Video Light', 'fresnel light', 'Aputure video light', 'kino flo light', 'continuous output video light'];
let termsLights  = {termsLights1};

let videoRecorders = ['atomos ninja', 'atomos shogun', 'atomos recorder', 'blackmagic video monitor', 'smallhd monitor', '4k video recorder monitor', 'camera field monitor'];
let videoRecTerms = {videoRecorders};

let stablizers = ['DJI Ronin', 'zhiyun gimbal stabilizer', 'weebill lab gimbal stabilizer', 'Movo gimbal stabilizer', 'FLYCAM Stabilizing Arm Video Vest', 'Wireless Motorized Camera Slider', 'Movo Steadycam System', 'Glidecam Professional Camera Stabilization System'];
let stablizersTerms = {stablizers};

let termsG2      = ['camera dolly', 'camera crane', 'camera slider', 'camera jib', 'camera bag', 'camera tripod', 'monopod', 'lens hood', 'camera viewfinder', 'camera follow-focus', 'video matte box'];
let termsGear    = {termsG2};

let termsAu1    = ["rode microphone", 'sennheiser microphone', 'shotgun microphone', 'shure microphone', 'tascam recorder', 'zoom audio recorder'];
let termsAudio    = {termsAu1};

let vidCards = ["AMD Ryzen", "intel core i9", "EVGA GeForce RTX 2080", "AMD Radeon Pro", "video card gpu 16gb", "Intel Xeon processor cpu", "AMD Epyc processor cpu"];
let termsvidCards = {vidCards};

let terms = {
	cameras: termsCameras,
	monitors:videoRecTerms,
	stabilizers: stablizersTerms,
	lenses: termsLenses,
	lights: termsLights,
	audio: termsAudio,
	miscellaneous: termsGear,
	workstation: termsvidCards,
	test: termsMini
};

module.exports = terms;