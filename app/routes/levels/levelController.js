import async from 'async';
import {
  logger,
} from '../../../log';
import Level from '../../models/level';
import Team from '../../models/team';

const getCurrentLevel = (user, alias, callback) => {
  const tasks = [
    (callback) => {
      Team.findById(user.team_id, (err, team) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, team);
      });
    },

    (team, callback) => {
      Level.findOne({
        sub_levels: {
          $elemMatch: {
            url_alias: alias,
          },
        },
      }, (err, level) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (level) {
          const teamLevelNo = team.level_no;
          const teamSubLevelNo = team.sub_levels;

          if (level.level_no > teamLevelNo) {
            return callback('access denied', null);
          }
          if (level.sub_levels[0].sub_level_no > teamSubLevelNo) {
            return callback('access denied', null);
          }

          return callback(null, level);
        }
        return callback('No level found', null);
      });
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      logger.error(err);
      return callback(err, null);
    }
    return callback(null, response);
  });
};


const getAllLevels = (user, callback) => {
  const tasks = [
    (callback) => {
      Team.findById(user.team_id, (err, team) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        return callback(null, team);
      });
    },

    (team, callback) => {
      Level.findOne({
        sub_levels: {
          $elemMatch: {
            url_alias: alias,
          },
        },
      }, (err, level) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        if (level) {
          const teamLevelNo = team.level_no;
          const teamSubLevelNo = team.sub_levels;

          if (level.level_no > teamLevelNo) {
            return callback('access denied', null);
          }
          if (level.sub_levels[0].sub_level_no > teamSubLevelNo) {
            return callback('access denied', null);
          }

          return callback(null, level);
        }
        return callback('No level found', null);
      });
    },
  ];

  async.waterfall(tasks, (err, response) => {
    if (err) {
      logger.error(err);
      return callback(err, null);
    }
    return callback(null, response);
  });
};

export default {
  getCurrentLevel,
};
