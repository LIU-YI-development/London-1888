import {
  NoVictimOrCitizenExistError,
  SameDistanceFromVictimError,
  VictimExistsError
} from '../errors';
import CitizenRepo from '../orm/repositories/citizenRepo';

class London {
  constructor() {
    this.dal = new CitizenRepo();
  }

  async addCitizen(name, posX, posY) {
    return await this.dal.add(name, posX, posY, false);
  }

  async addVictim(name, posX, posY) {
    if (await this.dal.checkVictim()) {
      return await this.dal.add(name, posX, posY, true);
    } else {
      throw new VictimExistsError();
    }
  }

  async clearEvidences() {
    return await this.dal.cleanAll();
  }

  async getData() {
    return await this.dal.getData();
  }

  async getJack() {
    const peoples = await this.dal.getData();
    if (
      !peoples.some((people) => !people.isVictim) ||
      !peoples.some((people) => people.isVictim)
    ) {
      throw new NoVictimOrCitizenExistError();
    }

    const victim = peoples.find((people) => people.isVictim);
    const citizens = peoples.filter((people) => !people.isVictim);
    const citizens_with_distance = [];

    citizens.forEach((citizen) => {
      citizens_with_distance.push({
        citizen,
        distance: findDistance(
          victim.posX,
          victim.posY,
          citizen.posX,
          citizen.posY
        )
      });
    });
    citizens_with_distance.sort((c1, c2) => c1.distance - c2.distance);
    if (citizens_with_distance.length >= 2) {
      if (
        citizens_with_distance[0].distance ===
        citizens_with_distance[1].distance
      ) {
        throw new SameDistanceFromVictimError();
      }
    }
    return citizens_with_distance[0].citizen;
  }
}

const findDistance = (px1, py1, px2, py2) => {
  const distance = Math.sqrt(Math.pow(px1 - px2, 2) + Math.pow(py1 - py2, 2));
  return distance;
};

export default London;
