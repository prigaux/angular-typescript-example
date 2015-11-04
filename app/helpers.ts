class HelpersService {
  constructor(private $http: angular.IHttpService) {
  }

  private static townsSearchUrl = "https://wsgroups.univ-paris1.fr/ws/postalCodeLookup";

  postalcode2towns(postalcode : string) : angular.IPromise<string[]> {
    return this.$http.get(
      HelpersService.townsSearchUrl,
      { params: { country: 'FR', postalcode: postalcode } }
    ).then(r => r.data && r.data['towns']);
  }
}
