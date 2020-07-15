<template>
  <div id="score_card">
    <h3 style="text-align: center">{{ exam.exam }}</h3>
    <div class="score-card">
      <h5>Your Mark Sheet</h5>
      <div class="summary-title">
        Total Marks: {{ totalMarks }} Total Obtained: {{ obtained }} ({{
          (obtained * 100) / totalMarks
        }})%
      </div>
      <div class="summary-title">
        Duration: {{ hour }} : {{ minute }} : {{ second }}
      </div>
      <b-container>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Total Questions</th>
              <th scope="col">Correct</th>
              <th scope="col">Wrong/Unanswered</th>
              <th scope="col">Mark Obtained</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subject, index) in resultSheet" :key="index">
              <th scope="row">{{ subject.subjectName }}</th>
              <td>{{ subject.questionCount }}</td>
              <td>{{ subject.correctAnswer }}</td>
              <td>{{ subject.incorrectAnswer }}</td>
              <td>{{ subject.marksObtained }}</td>
            </tr>
            <tr>
              <th scope="row">Total</th>
              <td>{{ totalMarks }}</td>
              <td>{{ obtained }}</td>
              <td>{{ totalMarks - obtained }}</td>
              <td>{{ obtained }} ({{ (obtained * 100) / totalMarks }})%</td>
            </tr>
          </tbody>
        </table>
      </b-container>
      <div class="summary">
        <b-button block variant="primary" @click="downloadJson"
          >Generate Json file</b-button
        >
      </div>
    </div>
    <a id="downloadAnchorElem" style="display:none"></a>
  </div>
</template>

<script>
export default {
  name: 'ScoreCard',
  props: ['examIdx', 'remainingTime'],
  data: function() {
    return {
      totalMarks: 0,
      obtained: 0,
      resultSheet: []
    }
  },
  computed: {
    exam() {
      return this.$store.state.exams[this.examIdx]
    },
    hour() {
      var timeTaken = this.exam.duration * 60 - parseInt(this.remainingTime)
      return Math.floor(timeTaken / (60 * 60))
    },
    minute() {
      var timeTaken = this.exam.duration * 60 - parseInt(this.remainingTime)
      timeTaken %= 60 * 60
      return Math.floor(timeTaken / 60)
    },
    second() {
      var timeTaken = this.exam.duration * 60 - parseInt(this.remainingTime)
      timeTaken %= 60 * 60
      timeTaken %= 60
      return timeTaken
    }
  },
  methods: {
    downloadJson: function() {
      var dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(this.$store.state.exams))
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', 'data.json')
      document.body.appendChild(downloadAnchorNode) // required for firefox
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    }
  },
  mounted() {
    // Calculate total marks
    var tmarks = 0
    this.exam.subjects.forEach(subject => {
      tmarks += subject.questions.length

      // Calculate resultsheet
      var questionCount = subject.questions.length
      var subjectName = subject.subject
      var correctAnswer = 0
      var incorrectAnswer = 0
      // Calculate obtained Marks
      subject.questions.forEach(question => {
        if (question.answer === question.selectedOptionIdx) {
          this.obtained++
          correctAnswer++
        }
      })
      incorrectAnswer = questionCount - correctAnswer
      this.resultSheet.push({
        subjectName,
        questionCount,
        correctAnswer,
        incorrectAnswer,
        marksObtained: correctAnswer
      })
    })
    this.totalMarks = tmarks
  }
}
</script>

<style lang="scss" scoped>
$primary_color: rgb(0, 22, 121);

.score-card {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  h5 {
    text-align: center;
  }
  .summary-title {
    color: $primary_color;
    text-align: center;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    padding: 0.25rem 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    font-weight: 600;
  }
  .summary {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translate(-50%);

    .summary-body {
      background-color: rgba(201, 201, 201, 0.1);
      padding: 1rem 1rem;
      border-radius: 8px;
      p {
        margin: 0;
      }
    }
  }
}
</style>
