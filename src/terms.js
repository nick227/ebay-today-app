let termsMini = ["pipe"];

let termsCameras = ['panasonic lumix gh4', 'panasonic lumix gh5', 'canon xc10', 'canon c100 camera', 'canon c200 camera', 'canon c300 camera', 'canon c500 camera', 'canon mark IV', 'canon 80D', 'canon M50', 'canon eos-1d x mark', 'sony fs5 camera', 'sony fs7 camera', 'black magic cinema camera', 'black magic ursa mini camera', 'Arri Alexa', 'red camera digital cinema', 'Fujifilm X-T20', 'Fujifilm X-T3'];


let termsLenses = ["EF mount lens", 'micro four thirds lens', "parfocal Lens", "cine lens", 'cinema lens', 'anamorphic camera lens'];


let termsLights = ["godox video light", 'video studio lighting', 'LED Video Light', 'fresnel light', 'Aputure video light', 'kino flo light', 'continuous output video light'];


let videoRecTerms = ['atomos ninja', 'atomos shogun', 'atomos recorder', 'blackmagic video monitor', 'smallhd monitor', '4k video recorder monitor', 'camera field monitor'];


let stablizersTerms = ['DJI Ronin', 'zhiyun gimbal stabilizer', 'weebill lab gimbal stabilizer', 'FLYCAM stabilizer', 'Wireless Motorized Camera Slider', 'Movo Steadycam System', 'Glidecam Stabilization'];


let termsAudio = ["rode microphone", 'sennheiser microphone', 'shotgun microphone', 'shure microphone', 'tascam recorder', 'zoom audio recorder'];


let termsvidCards = ["AMD Ryzen", "intel core i9", "EVGA GeForce RTX 2080", "AMD Radeon Pro", "video card gpu 16gb", "Intel Xeon processor cpu", "AMD Epyc processor cpu"];

let terms = {
    cameras: termsCameras,
    monitors: videoRecTerms,
    stabilizers: stablizersTerms,
    lenses: termsLenses,
    lights: termsLights,
    audio: termsAudio,
    workstation: termsvidCards,
    test: termsMini
};

module.exports = terms;