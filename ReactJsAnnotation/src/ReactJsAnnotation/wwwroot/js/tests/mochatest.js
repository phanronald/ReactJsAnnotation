suite('my test', function () {


	setup(function () {
		console.log('setup');
	});

	teardown(function () {
		console.log('teardown');
	});

	test('tests1', function () {
		expect(1).to.equal(1);
	});


	suite('inner test', function () {

		test('tests2', function () {
			expect(2).to.equal(2);
		});


	});

});