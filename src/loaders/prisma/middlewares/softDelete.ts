import { Prisma } from "@prisma/client";
import _ from "lodash";

const findUsingSoftDelte: Prisma.Middleware = async (params, next) => {
  if (! _.get(Prisma, `${params.model}ScalarFieldEnum.deleted`)) return next(params);

  if (!params.args) {
    params.args = {};
  } 

  if (params.action === 'findUnique' || params.action === 'findFirst') {
    // Change to findFirst - you cannot filter
    // by anything except ID / unique with findUnique
    
    // Use extendedWhereUnique
    // params.action = 'findFirst'
    
    // Add 'deleted' filter
    // ID filter maintained
    params.args.where['deleted'] = false
  }
  if (params.action === 'findMany') {
    // Find many queries
    if (params.args.where) {
      if (params.args.where.deleted == undefined) {
        // Exclude deleted records if they have not been explicitly requested
        params.args.where['deleted'] = false
      }
    } else {
      params.args['where'] = { deleted: false }
    }
  }
  
  return next(params);
};

// Not used: Foreign keys cannot be used.
const updateUsingSoftDelte: Prisma.Middleware = (async (params, next) => {
  if (! _.get(Prisma, `${params.model}ScalarFieldEnum.deleted`)) return next(params);
  
  if (params.action == 'update') {
    // Change to updateMany - you cannot filter
    // by anything except ID / unique with findUnique
    
    // Use extendedWhereUnique
    // params.action = 'updateMany'
    
    // Add 'deleted' filter
    // ID filter maintained
    params.args.where['deleted'] = false
  }
  if (params.action == 'updateMany') {
    if (params.args.where != undefined) {
      params.args.where['deleted'] = false
    } else {
      params.args['where'] = { deleted: false }
    }
  }

  return next(params)
});
    
const deleteUsingSoftDelete: Prisma.Middleware = async (params, next) => {
  if (! _.get(Prisma, `${params.model}ScalarFieldEnum.deleted`)) return next(params);

  if (params.action == 'delete') {
    // Delete queries
    // Change action to an update
    params.action = 'update'
    params.args['data'] = { deleted: true }
  }
  if (params.action == 'deleteMany') {
    // Delete many queries
    params.action = 'updateMany'
    if (params.args.data != undefined) {
      params.args.data['deleted'] = true
    } else {
      params.args['data'] = { deleted: true }
    }
  }
  
  return next(params)
};

const softDelete: Prisma.Middleware = async (params, next) => {
  return findUsingSoftDelte(params, async (params) => {
    return updateUsingSoftDelte(params, async (params) => {
      return deleteUsingSoftDelete(params, next);
    });
  });
};

export default softDelete;