<template>
  <div class="flex justify-center">
    <form class="flex justify-between w-3/5 px-2 py-8">
      <div class="flex flex-col">
        Location:
        <input type="text" class="mt-3 shadow appearance-none border rounded text-gray-700 px-4 py-2 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div>
        Job category:
        <select id="job-category" class="mt-3 block bg-white border hover:border-gray-500 px-4 py-2 pr-8 rounded outline-none shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="devops">DevOps</option>
          <option value="ux/ui">UX/UI</option>
          <option value="blockchain">Blockchain</option>
          <option value="data">Data</option>
          <option value="testing">Testing</option>
          <option value="security">Security</option>
          <option value="pm">PM</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
      <div>
        Job type
        <select id="job-type" class="mt-3 block outline-none bg-white border hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="full-time">Full time</option>
          <option value="part-time">Part time</option>
          <option value="remote">Remote</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
