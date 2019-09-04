(() => {
  const blackListKey = 'black-list'
  const aliasListKey = 'alias-list'
  const addBlackListForm = document.getElementById('add-black-list-form')
  const addAliasListForm = document.getElementById('add-alias-list-form')
  const addBlackListInput = document.getElementById('add-black-list-input')
  const addAliasInput = document.getElementById('add-alias-input')
  const addAliasTargetInput = document.getElementById('add-alias-target-input')


  const createBlackListItem = (item, index) => {
    const itemElement = document.createElement('li')
    itemElement.setAttribute('class', 'collection-item list-item')
    itemElement.innerHTML = `
<div>${item}</div>
<button type="button" class="btn-floating btn-flat waves-effect delete-button">
    <i class="material-icons grey-text">delete</i>
</button>
`
    const deleteButton = itemElement.getElementsByTagName('button')[0]
    deleteButton.addEventListener('click', handleDeleteBlackListItem(index))
    return itemElement
  }

  const createAliasListItem = (item, index) => {
    const itemElement = document.createElement('li')
    itemElement.setAttribute('class', 'collection-item list-item')
    itemElement.innerHTML = `
<div class="alias-item">
    <div class="alias-word">${item.alias}</div>
    <div class="alias-target">${item.target}</div>
</div>
<button type="button" class="btn-floating btn-flat waves-effect delete-button">
    <i class="material-icons grey-text">delete</i>
</button>
`
    const deleteButton = itemElement.getElementsByTagName('button')[0]
    deleteButton.addEventListener('click', handleDeleteAliasListItem(index))
    return itemElement
  }

  const renderBlackList = () => {
    const listElement = window.document.getElementById(blackListKey)
    const listClone = listElement.cloneNode(false)
    listElement.parentNode.replaceChild(listClone, listElement)
    const currentData = JSON.parse(localStorage.getItem(blackListKey))
    const list = Array.isArray(currentData) ? currentData : []
    list.forEach((item, index) => {
      const itemElement = createBlackListItem(item, index)
      listClone.appendChild(itemElement)
    })
  }

  const renderAliasList = () => {
    const listElement = window.document.getElementById(aliasListKey)
    const listClone = listElement.cloneNode(false)
    listElement.parentNode.replaceChild(listClone, listElement)
    const currentData = JSON.parse(localStorage.getItem(aliasListKey))
    const list = Array.isArray(currentData) ? currentData : []
    list.forEach((item, index) => {
      const itemElement = createAliasListItem(item, index)
      listClone.appendChild(itemElement)
    })
  }

  const addBlackList = () => {
    if (addBlackListInput.value) {
      const currentData = JSON.parse(localStorage.getItem(blackListKey))
      const blackList = Array.isArray(currentData) ? currentData : []
      blackList.push(addBlackListInput.value)
      localStorage.setItem(blackListKey, JSON.stringify(blackList))
      addBlackListInput.value = ''
    }
  }

  const addAliasList = () => {
    if (addAliasInput.value && addAliasTargetInput.value) {
      const currentData = JSON.parse(localStorage.getItem(aliasListKey))
      const aliasList = Array.isArray(currentData) ? currentData : []
      const alias = {
        alias: addAliasInput.value,
        target: addAliasTargetInput.value
      }
      aliasList.push(alias)
      localStorage.setItem(aliasListKey, JSON.stringify(aliasList))
      addAliasInput.value = ''
      addAliasTargetInput.value = ''
    }
  }

  const handleAddBlackListSubmit = event => {
    event.preventDefault()
    addBlackList()
    renderBlackList()
  }

  const handleAddAliasListSubmit = event => {
    event.preventDefault()
    addAliasList()
    renderAliasList()
  }

  const handleDeleteBlackListItem = index => () => {
    const currentData = JSON.parse(localStorage.getItem(blackListKey))
    const blackList = Array.isArray(currentData) ? currentData : []
    blackList.splice(index, 1)
    localStorage.setItem(blackListKey, JSON.stringify(blackList))
    renderBlackList()
  }

  const handleDeleteAliasListItem = index => () => {
    const currentData = JSON.parse(localStorage.getItem(aliasListKey))
    const aliasList = Array.isArray(currentData) ? currentData : []
    aliasList.splice(index, 1)
    localStorage.setItem(aliasListKey, JSON.stringify(aliasList))
    renderAliasList()
  }

  addBlackListForm.addEventListener('submit', handleAddBlackListSubmit)
  addAliasListForm.addEventListener('submit', handleAddAliasListSubmit)
  renderBlackList()
  renderAliasList()
})()
