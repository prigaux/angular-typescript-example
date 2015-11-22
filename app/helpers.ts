const typeofReturn: <T>(f: (...any) => T) => T = _ => null;

namespace HelpersService {
  export function create($http: angular.IHttpService, $injector) {

    let townsSearchUrl = "https://wsgroups.univ-paris1.fr/ws/postalCodeLookup";

    function postalcode2towns(postalcode: string): angular.IPromise<string[]> {
        return this.$http.get(
            townsSearchUrl,
            { params: { country: 'FR', postalcode: postalcode } }
        ).then(r => r.data && r.data['towns']);
    }

    function inject<T>(f: (...any) => T): T {
      return $injector.invoke(f);
    }

    function assign<T1, T2>(o1: T1, o2: T2): T1 & T2 {
      let r = o1;
      angular.forEach(o2, (v,k) => r[k] = v);
      return <T1 & T2> r;
    }

    return { postalcode2towns, inject, assign };
  }
  let o = typeofReturn(create);
  export type T = typeof o;
}
