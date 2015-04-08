//mocha.bail();
//mocha.run();

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

// Test timeouts
var testTimeout = 35000;

// Get User Media timeout
var gUMTimeout = 25000;

// Test item timeout
var testItemTimeout = 4000;


describe('getUserMedia | MediaStreamError', function() {
	this.timeout(testTimeout);


	/* Get User Media */
	before(function (done) {
		this.timeout(testItemTimeout);

		if (window.webrtcDetectedBrowser !== 'IE' && window.webrtcDetectedBrowser !== 'Safari') {
			AdapterJS.onwebrtcreadyDone = true;
		}

		if (!AdapterJS.onwebrtcreadyDone) {
			AdapterJS.onwebrtcready = function () {
				done();
			};

		} else {
			done();
		}
	});

	it('MediaStreamError.name === MANDATORY_UNSATISFIED_ERROR', function (done) {
		this.timeout(testItemTimeout);

		window.getUserMedia({}, function (stream) {
			throw new Error('Invalid constraints passed still triggers a success callback');

		}, function (error) {
			expect(error.name).to.equal('MANDATORY_UNSATISFIED_ERROR');
			done();
		});
	});

	it.skip('MediaStreamError.name === PERMISSION_DENIED', function () {});

	it.skip('MediaStreamError.name === NOT_SUPPORTED_ERROR', function () {});
});