(() => {
  const blackListKey = 'black-list'
  const aliasListKey = 'alias-list'
  const addBlackListForm = window.document.getElementById('add-black-list-form')
  const addAliasListForm = window.document.getElementById('add-alias-list-form')
  const addBlackListInput = window.document.getElementById('add-black-list-input')
  const addAliasListInput = window.document.getElementById('add-alias-list-input')

  const addBlackList = () => {
    const currentData = JSON.parse(localStorage.getItem(blackListKey))
    const blackList = Array.isArray(currentData) ? currentData : []
    blackList.push(addBlackListInput.value)
    localStorage.setItem(blackListKey, JSON.stringify(blackList))
    addBlackListInput.value = ''
  }

  const addAliasList = () => {
    const currentData = JSON.parse(localStorage.getItem(aliasListKey))
    const aliasList = Array.isArray(currentData) ? currentData : []
    aliasList.push(addAliasListInput.value)
    localStorage.setItem(aliasListKey, JSON.stringify(aliasList))
    addAliasListInput.value = ''
  }

  const handleAddBlackListSubmit = event => {
    event.preventDefault()
    addBlackList()
  }

  const handleAddAliasListSubmit = event => {
    event.preventDefault()
    addAliasList()
  }

  addBlackListForm.addEventListener('submit', handleAddBlackListSubmit)
  addAliasListForm.addEventListener('submit', handleAddAliasListSubmit)
})()
