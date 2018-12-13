
let termsMini = ["canon mark IV"];

let termsBody    = ['panasonic lumix gh4 body', 'panasonic lumix gh5 body','sony a7 iii body', 'sony a6500 body', 'sony a9 body', 'canon mark IV body',  'black magic 4k cinema', 'Canon 70d body', 'canon D60 body', 'canon M50 body', 'canon 5D body', 'canon eos-1d x mark body', 'canon rebel t6 body', 'canon eos 6d II body', 'canon 80D body', 'Nikon z7 body', 'Nikon D850 body', 'Nikon D750 body', 'Pentax K-1 Mark II body', 'olympus om-d e-m10 body', 'Fujifilm X-T20 body', 'Fujifilm X-T3 body', 'sony alpha camera body',   'video camcorder'];
let termsCameras = {termsBody};

let termsLenses1  = ["canon ef lens", 'Sigma lens', 'olympus lens', 'sony lens', 'rokinon lens', 'tokina lens', 'lens voigtlander'];
let termsLenses2  = ['cine camera lens', 'micro four thirds lens', 'prime camera lens', 'zoom camera lens', 'vintage camera lens'];
let termsLenses  = {termsLenses1, termsLenses2};


let termsLights1  = ["godox flash", 'speedlite flash', 'Yongnuo', 'Wireless Flash'];
let termsLights2  = ['fresnel lighting', 'video led lighting', 'studio flash photography', 'stage lighting'];
let termsLights  = {termsLights1, termsLights2};

let termsGear1   = ['manfrotto', 'DJI Ronin', 'Vanguard tripod'];
let termsG2      = ['gimbal stabilizer', 'camera dolly', 'camera crane', 'camera slider', 'camera jib', 'camera bag', 'tripod', 'monopod', 'lens hood', 'camera viewfinder', 'camera filter', 'photography backdrop'];
let termsGear    = {termsGear1, termsG2};

let termsAu1    = ["rode microphone", 'lavalier mic', 'shotgun microphone', 'professional microphone'];
let termsAu2   = ['tascam', 'zoom audio', 'digital audio recorder', 'headphones'];
let termsAudio    = {termsAu1, termsAu2};
/*
let termsShoe1 = ["addidas", "nike", "onitsuka shoe", "converse shoe", "puma shoe", "vans shoes", "air jordans", "Bacco Bucci", "Designer Mens shoe", "allen edmonds shoe", "bruno magli shoe", "lululemon shoe", "limited shoes"];
let termsShoes = {termsShoe1};

let termsOther = ["burton snowboard"];
let termsOthers = {termsOther};

let termsWatch1 = ["timex", "rolex", "movado watch", "seiko watch", "smartwatch", "quartz stainless watch", "fossil watch", "BREITLING watch","armani watch",  "skagen watch", "tag monaco watch", "Panerai Luminor Due", "MONDAINE HELVETICA", "limited luxury watch", "cartier mens watch", "montblanc watch", "Vacheron Constantin", "mens diamond watch", "tag heuer watch"];
termsWatches = {termsWatch1};

let termsBook = ["graphic novel book", "signed copy book", "first print book", "collectors edition book", "vintage book"];
let termsBooks = {termsBook};
*/

let terms = {
	cameras: termsCameras,
	lenses: termsLenses,
	lights: termsLights,
	audio: termsAudio,
	gear: termsGear
};

module.exports = terms;