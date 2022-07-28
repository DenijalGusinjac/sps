import moment from 'moment';

export const converter = {
  methods: {
    convertMsToMin(milisec) {
      const minutes = Math.floor(milisec / 60000);
      const seconds = ((milisec % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
    convertDate(date){
        return moment(String(date)).format('DD.MM.YYYY')
    }
  },
};
