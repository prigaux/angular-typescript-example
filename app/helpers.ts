function getReturnType<T>(o: (...args) => T): T { return null; };

namespace HelpersService {
  let townsSearchUrl = "https://wsgroups.univ-paris1.fr/ws/postalCodeLookup";

  export function create($http: angular.IHttpService, $injector) {

    function postalcode2towns(postalcode: string): angular.IPromise<string[]> {
        return $http.get(
            townsSearchUrl,
            { params: { country: 'FR', postalcode: postalcode } }
        ).then(r => r.data && r.data['towns']);
    }

    // typed version of $injector.invoke
    function inject<T>(f: (...any) => T): T {
      return $injector.invoke(f);
    }

    // similar to ES6 Object.assign
    function assign<T1, T2>(o1: T1, o2: T2): T1 & T2 {
      let r = o1;
      angular.forEach(o2, (v, k) => r[k] = v);
      return <T1 & T2> r;
    }

    return { postalcode2towns, inject, assign };
  }
  let o = getReturnType(create);
  export type T = typeof o;
}
