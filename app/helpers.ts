function getReturnType<T>(o: (...args) => T): T { return null; };

namespace HelpersService {
  let townsSearchUrl = "https://wsgroups.univ-paris1.fr/ws/postalCodeLookup";

  export function create($http: angular.IHttpService) {

    function postalcode2towns(postalcode: string): angular.IPromise<string[]> {
        return $http.get(
            townsSearchUrl,
            { params: { country: 'FR', postalcode: postalcode } }
        ).then(r => r.data && r.data['towns']);
    }
    return { postalcode2towns };
  }
  let o = getReturnType(create);
  export type T = typeof o;
}
