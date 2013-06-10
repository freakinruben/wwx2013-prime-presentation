package js.reveal;

typedef RevealEvent = {
	currentSlide : Dynamic,
	previousSlide : Dynamic,
	indexh : Int,
	indexv : Int
}

@:native('Reveal') extern class Reveal {
	public function hideAddressBar() : Void;
	public function load() : Void;
	public function start() : Void;
	public function configure() : Void;
	static function addEventListener(e:String, f:RevealEvent->Void) : Void;
	static function removeEventListener(e:String, f:RevealEvent->Void) : Void;
	public function addEventListeners() : Void;
	public function removeEventListeners() : Void;
	public function extend() : Void;
	public function toArray() : Void;
	public function removeAddressBar() : Void;
	public function dispatchEvent() : Void;
	public function enable3DLinks() : Void;
	public function disableDLinks() : Void;
	public function layout() : Void;
	public function setPreviousVerticalIndex() : Void;
	public function getPreviousVerticalIndex() : Void;
	public function activateOverview() : Void;
	public function deactivateOverview() : Void;
	public function toggleOverview() : Void;
	public function isOverview() : Bool;
	public function isVerticalSlide() : Bool;
	public function enterFullscreen() : Void;
	public function pause() : Void;
	public function resume() : Void;
	public function togglePause() : Void;
	public function isPaused() : Bool;
	public function sync() : Void;
	public function updateProgress() : Void;
	public function updateControls() : Void;
	public function startEmbeddedContent() : Void;
	public function stopEmbeddedContent() : Void;
	public function readURL() : Void;
	public function writeURL() : Void;
	public function nextFragment() : Bool;
	public function previousFragment() : Bool;
	public function cueAutoSlide() : Void;
	public function cancelAutoSlide() : Void;
	public function navigateLeft() : Void;
	public function navigateRight() : Void;
	public function navigateUp() : Void;
	public function navigateDown() : Void;
	public function navigatePrev() : Void;
	public function navigateNext() : Void;
}
