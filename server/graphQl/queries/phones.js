
const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')
const { getPhones, searchPhones } = require('../../services');
const { phoneType } = require('../types/phone')
const PaginationArgType = require('../types/paginationParam');
const PaginatedListType = require('../types/paginationOutput');


exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      phones: {
        type: PaginatedListType(phoneType),
        args: {
          name: { type: GraphQLString },
          phone: { type: GraphQLString },
          pagination: {
            type: PaginationArgType,
            defaultValue: { offset: 0, limit: 5 }
          },
        },
        resolve: async (root, args) => {
          console.log('here wkwkwk')
          const { name, phone, pagination: { offset, limit } } = args
          console.log(name,phone,offset,limit)

          if (name || phone) {
            const data = await searchPhones(name, phone, offset, limit)
            console.log('inside query',data)
            return {
              items: data.listData,
              totalData: data.dataLength
            }
          } else {
            const data = await getPhones(offset, limit)
            return {
              items: data.listData,
              totalData: data.totalData
            }
          }

        }
      }
    }
  }

})
