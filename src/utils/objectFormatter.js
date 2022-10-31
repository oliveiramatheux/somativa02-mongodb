import lodash from 'lodash'

const objectFormatter = (object) => lodash.omitBy(object, lodash.isNil)

export { objectFormatter }
