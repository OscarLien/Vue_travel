var app = new Vue({
  el: '#app',
  data: {
    text: '123',
    data: [],
    currentPage: 0,
    zone: [],
    currentZone: '',
  },
  created() {
    const vm = this;
    axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
      .then((response) => {
        // handle success
        console.log(response);
        vm.data = response.data.result.records;
        vm.getZoneList();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  },
  methods: {
    getZoneList() {
      const vm = this;
      const zone = new Set();
      vm.data.forEach((item) => {
        zone.add(item.Zone);
      })
      console.log(zone);
      vm.zone = Array.from(zone);
    },
  },
  computed: {
    filterData() {
      const vm = this;
      let item = [];
      if (vm.currentZone === '') {
        item = vm.data;
      } else {
        item = vm.data.filter((item) => {
          return item.Zone == vm.currentZone;
        })
      }
      const newData = [];
      item.forEach((item, i) => {
        if (i % 10 === 0) {
          newData.push([]);
        }
        const page = parseInt(i / 10);
        newData[page].push(item);
      })
      console.log(newData);
      return newData

    },
  },
})