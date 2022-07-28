<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      class="table"
      v-if="data"
      :headers="headers"
      :items="data"
      :rows-per-page-items="[10, 25]"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-left">{{ convertMsToMin(props.item.length) }}</td>
        <td class="text-xs-left">{{ convertDate(props.item.createdAt) }}</td>
        <td class="text-xs-left">
          <v-btn
            color="blue darken-1"
            text
            @click="downloadData(props.item.uuid, props.item.title)"
            >Download</v-btn
          >
        </td>
        <td class="text-xs-left">
          <vue-plyr>
            <audio controls crossorigin playsinline>
              <source :src="playAudio(props.item.uuid)" type="audio/mpeg" />
            </audio>
          </vue-plyr>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "../plugins/axios";
import { converter } from "@/mixins/global";

export default {
  data() {
    return {
      data: null,
      search: "",
      headers: [
        {
          text: "Title",
          value: "title",
          align: "left",
          sortable: true,
        },
        {
          text: "Length",
          value: "length",
          align: "left",
          sortable: true,
        },
        {
          text: "Created At",
          value: "createdAt",
          align: "left",
          sortable: true,
        },
        {
          text: "Actions",
          align: "left",
          sortable: false,
        },
      ],
    };
  },
  mixins: [converter],
  methods: {
    async loadData() {
      try {
        await this.$store.dispatch("voiceMemos");
        this.data = this.$store.getters["voiceMemos"];
      } catch (error) {}
    },

    async downloadData(id, title) {
      await this.$store.dispatch("download", { id, title });
    },
    playAudio(id) {
      const response = axios.get(`voice-memos/${id}/download`, {
        responseType: "blob",
      });

      return window.URL.createObjectURL(new Blob([response.data]));
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style>
.table {
  border-radius: 3px;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
  background-color: transparent;
}
.flex.d-flex.lg8.sm6.xs12{
  max-width:100%;
  flex-basis:100%;
}
</style>
