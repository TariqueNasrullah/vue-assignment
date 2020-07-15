<template>
  <div id="questions">
    <b-container>
      <b-row>
        <b-col v-for="(ex, index) in data" :key="index">
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="https://picsum.photos/400/400/?image=20"
                  alt="Image"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body :title="ex.exam">
                  <b-card-text>
                    {{ ex.subjects.length }} Subjects |
                    {{ ex.duration }} Minutes
                  </b-card-text>
                  <b-card-text>
                    by EduHive Originals
                  </b-card-text>
                  <b-button @click="takeExam(index)" variant="primary"
                    >Perticipate Exam</b-button
                  >
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'QuestionList',
  computed: {
    data() {
      return this.$store.state.exams
    }
  },
  methods: {
    takeExam(idx) {
      this.$router.push({ name: 'exam', params: { idx: idx } })
    }
  }
}
</script>

<style lang="scss" scoped></style>
