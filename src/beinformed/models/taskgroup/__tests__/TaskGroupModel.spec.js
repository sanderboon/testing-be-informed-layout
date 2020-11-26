import TaskGroupModel from "../TaskGroupModel";

describe("TaskGroupModel", () => {
  it("should be able to create an empty Taskgroup mode", () => {
    const taskgroup = new TaskGroupModel({});

    expect(taskgroup).toBeInstanceOf(TaskGroupModel);
  });
});
