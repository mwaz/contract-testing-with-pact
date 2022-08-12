class Controller {
    constructor() {
        this.entities = []
    }

    fetchAll() {
        return this.entities
    }

    getById(id) {
        return this.entities.find(entity => id == entity.id)
    }

    insert(entity) {
        this.entities.push(entity)
    }

    clear(id) {
        this.entities = this.entities.filter(entity => entity.id != id)
    }

    update(entity) {
        const index = this.entities.findIndex(e => e.id == entity.id)
        this.entities[index] = entity
    }
    getNextId() {
        return this.entities.length + 1
    }
  
}

module.exports = Controller
