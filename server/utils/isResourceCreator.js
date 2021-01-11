const isResourceCreator = (requesterId, resourceCreatorId) => {
  return requesterId === resourceCreatorId.toString()
}

module.exports = isResourceCreator
