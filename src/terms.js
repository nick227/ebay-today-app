
let termsMini = [["pipe"]];

let termsBody    = ['panasonic lumix gh4 body', 'panasonic lumix gh5 body'];
let termsBody2 = ['canon rebel', 'canon c100', 'canon c200', 'canon c300', 'canon mark IV body', 'canon 80D body', 'Canon 70d body', 'canon D60 body', 'canon M50 body', 'canon 5D body', 'canon eos-1d x mark body', 'canon rebel t6 body', 'canon eos 6d II body'];
let termsBody3 = ['sony a7 iii body', 'sony a6500 body', 'sony a9 body','sony alpha camera body', 'sony camera body'];
let termsBody4 = ['black magic 4k cinema', 'blackmagic camera'];
let termsBody5 = ['Nikon z7 body', 'Nikon D850 body', 'Nikon D750 body'];
let termsBody6 = ['Pentax K-1 Mark II body', 'olympus om-d e-m10 body', 'Fujifilm X-T20 body', 'Fujifilm X-T3 body'];
let termsCameras = {termsBody, termsBody2, termsBody3, termsBody4, termsBody5, termsBody6};

let termsLenses1  = ["canon ef lens", 'Sigma lens', 'Panasonic Lumix lens', 'Sony lens', 'Rokinon lens', 'Tokina lens', 'Olympus lens', 'Voigtlander lens'];
let termsLenses2  = ['cine camera lens', 'full frame camera lens', 'micro four thirds lens', 'prime camera lens', 'zoom camera lens', 'vintage camera lens'];
let termsLenses  = {termsLenses1, termsLenses2};


let termsLights1  = ["godox video light", 'video studio lighting', 'LED Video Light', 'fresnel light', 'Aputure video light', 'kino flo light', 'continuous output video light'];
let termsLights  = {termsLights1};

let videoRecorders = ['atomos ninja', 'atomos shogun', 'atomos recorder', 'blackmagic video monitor', 'smallhd monitor', '4k video recorder monitor', 'camera field monitor'];
let videoRecTerms = {videoRecorders};

let stablizers = ['DJI Ronin', 'zhiyun crane', 'weebill lab', 'gimbal stabilizer', 'video stabilizer dslr'];
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