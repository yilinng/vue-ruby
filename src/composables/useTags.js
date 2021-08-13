// take in an array of posts
// create a new tag set (so no duplicates)
// add the tags of each post to the tag set
// return a a single array of tags based on the set

import { ref } from 'vue'

const useTags = (posts) => {

  const tags = ref([])
  const tagSet = new Set()
  const tagCollect = {}

  posts.forEach((item, index) => {
    item.tag.split(',').forEach(ta => {
      tagSet.add(ta.trim())
      //console.log(ta, index)
      tagCollect[ta] ? tagCollect[ta].push(index) : tagCollect[ta] = [index]
      //console.log(tagCollect)
    })
  })
  tags.value = [...tagSet]

  return { tags, tagCollect }

}

export default useTags
