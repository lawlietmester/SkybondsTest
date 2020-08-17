import obligationsCache from './library';


test( 'incorrect input date: not a string', () => {
	expect.assertions( 1 );
	obligationsCache({ 'date': 5, 'isins': [ '1' ] })
		.catch( error => { expect( error instanceof Error ).toBe( true ) });
});

test( 'incorrect input isins: not an array', () => {
	expect.assertions( 1 );
	obligationsCache({ 'date': '1', 'isins': 6 })
		.catch( error => { expect( error instanceof Error ).toBe( true ) });
});

test( 'incorrect input isins: empty array', () => {
	expect.assertions( 1 );
	obligationsCache({ 'date': '1', 'isins': [] })
		.catch( error => { expect( error instanceof Error ).toBe( true ) });
});