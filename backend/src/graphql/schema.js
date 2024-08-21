const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const ContractEvent = require('../models/ContractEvent');

const EventInstanceType = new GraphQLObjectType({
    name: 'EventInstance',
    fields: {
        timestamp: { type: GraphQLString },
        data: { type: GraphQLString }
    }
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: {
        eventName: { type: GraphQLString },
        instances: { type: new GraphQLList(EventInstanceType) }
    }
});

const ContractType = new GraphQLObjectType({
    name: 'Contract',
    fields: {
        _id: { type: GraphQLString },
        events: { type: new GraphQLList(EventType) }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        contract: {
            type: ContractType,
            args: { 
                eventName: { type: GraphQLString }
            },
            resolve: async (parent, args, context) => {
                const contract = await ContractEvent.findById(context.user.contractAddress);
                if (!contract) return null;

                const events = [];

                if (args.eventName) {
                    const instances = contract.events.get(args.eventName);
                    if (Array.isArray(instances)) {
                        events.push({
                            eventName: args.eventName,
                            instances: instances.map(instance => ({
                                timestamp: instance.timestamp,
                                data: JSON.stringify(instance.data, null, 2)
                            }))
                        });
                    }
                } else {
                    contract.events.forEach((instances, eventName) => {
                        if (Array.isArray(instances)) {
                            events.push({
                                eventName,
                                instances: instances.map(instance => ({
                                    timestamp: instance.timestamp,
                                    data: JSON.stringify(instance.data, null, 2)
                                }))
                            });
                        }
                    });
                }

                return { _id: contract._id, events };
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
