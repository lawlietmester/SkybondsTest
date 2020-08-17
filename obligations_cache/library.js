// @flow
// import http from 'SomeHttpRequestLibary';


export default async(
	{ date, isins }/*: { 'date': string, 'isins': string[] }*/
)/*: Promise<Array<{| 'isin': string, 'data': Object |}>>*/ => {
	if( typeof date !== 'string' ) throw new Error( '"date" parameter is not a string' );
	if( !Array.isArray( isins ) ) throw new Error( '"isins" parameter is not an array' );
	if( !isins.length ) throw new Error( '"isins" parameter is empty array' );
	if( !isins.every( item => typeof item === 'string' ) ){
		throw new Error( '"isins" parameter is not an array of strings' );
	}
	
	let cacheResults/*: Array<{| 'isin': string, 'data': Object | void |}>*/ = 
		isins.map( isin => {
			let preData = localStorage.getItem( 'bonds_' + isin + '|' + date );
			let data;
			
			if( preData ){
				try{
					data = JSON.parse( preData );
				}
				catch( error ){}
			}
			
			return { isin, data };
		});
	
	// Everything cached
	if( cacheResults.every( ({ data }) => data ) ){
		return cacheResults;
	}
	
	// Something needs a request
	let list/*: string[]*/ = cacheResults.reduce( ( carry, { data, isin }) => {
		if( !data ) carry.push( isin );
			
		return carry;
	}, [] );
	const requestsResult/*: Array<{| 'isin': string, 'data': Object |}>*/ = 
		await http.post({
			url: `/bonds/${date}`,
			body: list
		});
	requestsResult.forEach( ({ isin, data }) => {
		localStorage.setItem( 'bonds_' + isin + '|' + date, JSON.stringify( data ) );
	});
	
	return cacheResults.map( ({ isin, data }) => {
		if( !data ){
			let result/*: {| 'isin': string, 'data': Object |} | void*/ = 
				requestsResult.find( item => item.isin === isin );
			if( result ) data = result.data;
		}
		
		return { isin, data };
	});
};
