import async from 'async';
import {
  logger,
} from '../../../log';
import Level from '../../models/level';
import Team from '../../models/team';

const getAliasLevel = (user, alias, callback) => {
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
      },
      (err, level) => {
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
          if (level.level_no === teamLevelNo) {
            if (level.sub_levels.filter(o => o.url_alias === alias)[0].sub_level_no > teamSubLevelNo) {
              return callback('access denied', null);
            }
          }

          return callback(null, {
            level,
            teamLevelNo,
            teamSubLevelNo,
          });
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
      Level.find({
        level_no: {
          $lte: team.level_no,
        },
      }, (err, levels) => {
        if (err) {
          logger.error(err);
          return callback(err, null);
        }
        // Todo := filtering sublevels
        return callback(null, levels);
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

const getNextLevelAlias = (levelNo, subLevelNo, callback) => {
  Level.findOne({
    level_no: levelNo,
  }, {
    sub_levels: {
      $elemMatch: {
        sub_level_no: subLevelNo,
      },
    },
  }, (err, level) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, level);
  });
};

export default {
  getAliasLevel,
  getAllLevels,
  getNextLevelAlias,
};
