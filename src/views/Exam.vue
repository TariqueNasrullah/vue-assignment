<template>
  <div id="exam">
    <ExamDetails
      :examIdx="this.$route.params.idx"
      v-if="dataLoaded && !takeExamSelected"
      v-on:takeExamPressed="onTakeExamPressed"
    ></ExamDetails>
    <QuestionSet
      v-else-if="!examFinished"
      :examIdx="this.$route.params.idx"
      v-on:endExam="onEndExam"
    ></QuestionSet>
    <ScoreCard
      v-else
      :examIdx="$route.params.idx"
      :remainingTime="remainingTime"
    ></ScoreCard>
  </div>
</template>

<script>
import ExamDetails from '@/components/ExamDetails.vue'
import QuestionSet from '@/components/QuestionSet.vue'
import ScoreCard from '@/components/ScoreCard.vue'
export default {
  name: 'Exam',
  components: {
    ExamDetails,
    QuestionSet,
    ScoreCard
  },
  data: function() {
    return {
      takeExamSelected: false,
      examFinished: false,
      remainingTime: 0
    }
  },

  mounted() {
    if (
      typeof this.$store.state.exams[this.$route.params.idx] === 'undefined'
    ) {
      this.$router.push({ name: 'notfound' })
    }
  },
  computed: {
    dataLoaded() {
      return this.$store.state.exams != 0
    }
  },
  methods: {
    onTakeExamPressed: function() {
      this.takeExamSelected = true
    },
    onEndExam: function(data) {
      this.remainingTime = data.rem
      this.examFinished = true
    }
  }
}
</script>

<style></style>
