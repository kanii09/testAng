export class OptionItem {
    id?: number;
    variableName?: string;
    name?: string;
    filterCondition?: string;
  
    constructor({
      id,
      variableName,
      name,
      filterCondition
    }: {
      id?: number;
      variableName?: string;
      name?: string;
      filterCondition?: string;
    } = {}) {
      this.id = id;
      this.variableName = variableName;
      this.name = name;
      this.filterCondition = filterCondition;
    }

    static generateId(): number {
        // Generate a unique 4-digit number ID (between 1000 and 9999)
        return Math.floor(Math.random() * 9000) + 1000; // Ensures 4-digit range
    }
  }
  