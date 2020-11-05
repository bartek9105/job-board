<template>
  <div>
    <JobSearchForm buttonText="Post offer" buttonTextClear="Clear form"/>
    <Editor/>
  </div>
</template>

<script>
import JobSearchForm from '@/components/JobSearchForm'
import Editor from '@/components/Editor'

export default {
  name: 'JobPostForm',
  components: {
    JobSearchForm,
    Editor
  }
}
</script>

<style>

</style>
