const typeofReturn: <T>(f: (...any) => T) => T = _ => null;

namespace HelpersService {
  export function create($http: angular.IHttpService) {

    let townsSearchUrl = "https://wsgroups.univ-paris1.fr/ws/postalCodeLookup";

    function postalcode2towns(postalcode: string): angular.IPromise<string[]> {
        return this.$http.get(
            townsSearchUrl,
            { params: { country: 'FR', postalcode: postalcode } }
        ).then(r => r.data && r.data['towns']);
    }

    return { postalcode2towns };
  }
  let o = typeofReturn(create);
  export type T = typeof o;
}
