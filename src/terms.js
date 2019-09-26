
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
/*
let termsShoe1 = ["addidas", "nike", "onitsuka shoe", "converse shoe", "puma shoe", "vans shoes", "air jordans", "Bacco Bucci", "Designer Mens shoe", "allen edmonds shoe", "bruno magli shoe", "lululemon shoe", "limited shoes"];
let termsShoes = {termsShoe1};

let termsOther = ["burton snowboard"];
let termsOthers = {termsOther};

let termsWatch1 = ["timex", "rolex", "movado watch", "seiko watch", "smartwatch", "quartz stainless watch", "fossil watch", "BREITLING watch","armani watch",  "skagen watch", "tag monaco watch", "Panerai Luminor Due", "MONDAINE HELVETICA", "limited luxury watch", "cartier mens watch", "montblanc watch", "Vacheron Constantin", "mens diamond watch", "tag heuer watch"];
termsWatches = {termsWatch1};

let termsBook = ["graphic novel book", "signed copy book", "first print book", "collectors edition book", "vintage book"];
let termsBooks = {termsBook};f
*/

let terms = {
	cameras: termsCameras,
	monitors:videoRecTerms,
	stabilizers: stablizersTerms,
	lenses: termsLenses,
	lights: termsLights,
	audio: termsAudio,
	miscellaneous: termsGear,
	test: termsMini
};

module.exports = terms;