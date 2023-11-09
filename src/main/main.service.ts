import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import 'multer';

@Injectable()
export class MainService {
  constructor(private readonly prisma: PrismaService) { }

  async test() {
    const choices = await this.prisma.actionCompleting.findMany({
      where: {
        processId: 14,
        completed: false,
        closed: false,
        shablonAction: {
          type: 'CHOICE',
        },
      },
      include: {
        inputFieldValues: true,
        parents: true,
        shablonAction: {
          include: {
            children: {
              include: {
                child: {
                  include: {
                    inputFields: true,
                  },
                },
                transitionConditions: true,
              },
            },
          },
        },
      },
    });

    if (choices && choices.length) {
      for (const iterator of choices) {
        //правила для детей выбора проверяются с инпут валю
        if (!iterator.parents.length) continue;
        for (const child of iterator.shablonAction.children) {
          for (const transition of child.transitionConditions) {

            console.log('iterator', iterator)
            console.log('child', child)
            console.log('transition', transition)

            // const result = await this.getChoiceTransitionFunc(
            //   transition.transitionConditionFuncId,
            //   iterator.level,
            //   iterator.processId,
            // );
            // if (result) {
            //   const choice = await this.prisma.actionCompleting.update({
            //     data: {
            //       closed: true,
            //     },
            //     where: {
            //       id: iterator.id,
            //     },
            //   });

            //   const precreateActions = await this.prisma.actionCompleting.findMany({
            //     where: {
            //       shablonActionId: child.childId,
            //       processId: 14,
            //     },
            //   });

            //   const action = await this.prisma.actionCompleting.create({
            //     data: {
            //       shablonActionId: child.childId,
            //       processId: 14,
            //       level: precreateActions.length + 1,
            //     },
            //   });
            //   for (const inputField of child.child.inputFields) {
            //     await this.prisma.completedActionInputFieldValue.create({
            //       data: {
            //         completedActionId: action.id,
            //         processShablonActionInputFieldId: inputField.id,
            //         value: '',
            //       },
            //     });
            //   }

            //   await this.prisma.actionCompletingHierarchy.create({
            //     data: {
            //       parentId: iterator.id,
            //       childId: action.id,
            //     },
            //   });
          }
        }
      }
    }

    const func = await this.prisma.transitionConditionFunc.findFirst({
      where: {
        id: 24,
      },
    });

    console.log('func', func)

    const func1 = await this.prisma.transitionConditionFunc.findFirst({
      where: {
        id: 11,
      },
    });

    console.log('func1', func1)

    const func2 = await this.prisma.transitionConditionFunc.findFirst({
      where: {
        id: 4,
      },
    });

    console.log('func2', func2)

    const func3 = await this.prisma.transitionConditionFunc.findFirst({
      where: {
        id: 6,
      },
    });

    console.log('func3', func3)

    if (!func2?.firstCompletedActionInputFieldId || !func3?.firstCompletedActionInputFieldId) return;

    const inputField1 = await this.prisma.processShablonActionInputField.findFirst({
      where: {
        id: func2.firstCompletedActionInputFieldId,
      },
    });

    console.log('inputField1', inputField1)

    const inputField2 = await this.prisma.processShablonActionInputField.findFirst({
      where: {
        id: func3.firstCompletedActionInputFieldId,
      },
    });

    console.log('inputField2', inputField2)

    const data = await this.prisma.completedActionInputFieldValue.findFirst({
      where: {
        processShablonActionInputFieldId: 3,
        completedAction: {
          processId: 14,
          level: 1,
        },
      },
    });

    console.log('data', data)

    const data1 = await this.prisma.completedActionInputFieldValue.findFirst({
      where: {
        processShablonActionInputFieldId: 5,
        completedAction: {
          processId: 14,
          level: 1,
        },
      },
    });

    console.log('data1', data1)

  }

  async getChoiceTransitionFunc(functionId: number, level: number, processId: number) {
    const func = await this.prisma.transitionConditionFunc.findFirst({
      where: {
        id: functionId,
      },
    });

    if (!func) return false;

    let res = false;

    let firstValue;
    let secondValue;

    if (func.firstTransitionConditionId) {
      firstValue = await this.getChoiceTransitionFunc(func.firstTransitionConditionId, level, processId);
    }

    if (func.secondTransitionConditionId) {
      secondValue = await this.getChoiceTransitionFunc(func.secondTransitionConditionId, level, processId);
    }

    if (func.firstString) {
      firstValue = func.firstString;
    }
    if (func.secondString) {
      secondValue = func.secondString;
    }

    if (func.firstCompletedActionInputFieldId) {

      const inputField = await this.prisma.processShablonActionInputField.findFirst({
        where: {
          id: func.firstCompletedActionInputFieldId,
        },
      });

      if (!inputField) {
        return false;
      }

      const data = await this.prisma.completedActionInputFieldValue.findFirst({
        where: {
          processShablonActionInputFieldId: inputField.id,
          completedAction: {
            processId: processId,
            level: level,
          },
        },
      });
      firstValue = data?.value;
    }
    if (func.secondCompletedActionInputFieldId) {
      const inputField = await this.prisma.processShablonActionInputField.findFirst({
        where: {
          id: func.secondCompletedActionInputFieldId,
        },
      });

      if (!inputField) {
        return false;
      }

      const data = await this.prisma.completedActionInputFieldValue.findFirst({
        where: {
          processShablonActionInputFieldId: inputField.id,
          completedAction: {
            processId: processId,
            level: level,
          },
        },
      });
      secondValue = data?.value;
    }

    switch (func.compareOperator) {
      case 'EQUAL':
        res =
          (firstValue === '__true__' ? true : firstValue === '__false__' ? false : firstValue) ===
          (secondValue === '__true__' ? true : secondValue === '__false__' ? false : secondValue);
        break;
      case 'MORE':
        res = firstValue > secondValue;
        break;
      case 'LESS':
        res = firstValue < secondValue;
        break;
      case 'AND':
        res =
          (firstValue === '__true__' ? true : firstValue === '__false__' ? false : firstValue) &&
          (secondValue === '__true__' ? true : secondValue === '__false__' ? false : secondValue);
        break;
      case 'OR':
        res =
          (firstValue === '__true__' ? true : firstValue === '__false__' ? false : firstValue) ||
          (secondValue === '__true__' ? true : secondValue === '__false__' ? false : secondValue);
        break;
      default:
        break;
    }

    return res;
  }

  async checkAutoActions(processId: number) {
    let addedNew = false;
    const choices = await this.prisma.actionCompleting.findMany({
      where: {
        processId: processId,
        completed: false,
        closed: false,
        shablonAction: {
          type: 'CHOICE',
        },
      },
      include: {
        inputFieldValues: true,
        parents: true,
        shablonAction: {
          include: {
            children: {
              include: {
                child: {
                  include: {
                    inputFields: true,
                  },
                },
                transitionConditions: true,
              },
            },
          },
        },
      },
    });

    const propogations = await this.prisma.actionCompleting.findMany({
      where: {
        processId: processId,
        completed: false,
        closed: false,
        shablonAction: {
          type: 'PROPOGATION',
        },
      },
      include: {
        shablonAction: {
          include: {
            children: {
              include: {
                child: {
                  include: {
                    inputFields: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const all_waitings = await this.prisma.actionCompleting.findMany({
      where: {
        processId: processId,
        completed: false,
        closed: false,
        shablonAction: {
          type: 'WAITING_ALL',
        },
      },
      include: {
        inputFieldValues: true,
        parents: {
          include: {
            parent: true,
          },
        },
        shablonAction: {
          include: {
            inputFields: true,
            children: {
              include: {
                transitionConditions: true,
                child: {
                  include: {
                    inputFields: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const one_waitings = await this.prisma.actionCompleting.findMany({
      where: {
        processId: processId,
        completed: false,
        closed: false,
        shablonAction: {
          type: 'WAITING_ONE',
        },
      },
      include: {
        inputFieldValues: true,
        parents: {
          include: {
            parent: true,
          },
        },
        shablonAction: {
          include: {
            inputFields: true,
            children: {
              include: {
                transitionConditions: true,
                child: {
                  include: {
                    inputFields: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (choices && choices.length) {
      for (const iterator of choices) {
        //правила для детей выбора проверяются с инпут валю
        if (!iterator.parents.length) continue;
        for (const child of iterator.shablonAction.children) {
          for (const transition of child.transitionConditions) {
            const result = await this.getChoiceTransitionFunc(
              transition.transitionConditionFuncId,
              iterator.level,
              iterator.processId,
            );
            if (result) {
              addedNew = true;
              const choice = await this.prisma.actionCompleting.update({
                data: {
                  closed: true,
                },
                where: {
                  id: iterator.id,
                },
              });

              const precreateActions = await this.prisma.actionCompleting.findMany({
                where: {
                  shablonActionId: child.childId,
                  processId: processId,
                },
              });

              const action = await this.prisma.actionCompleting.create({
                data: {
                  shablonActionId: child.childId,
                  processId: processId,
                  level: precreateActions.length + 1,
                },
              });
              for (const inputField of child.child.inputFields) {
                await this.prisma.completedActionInputFieldValue.create({
                  data: {
                    completedActionId: action.id,
                    processShablonActionInputFieldId: inputField.id,
                    value: '',
                  },
                });
              }

              await this.prisma.actionCompletingHierarchy.create({
                data: {
                  parentId: iterator.id,
                  childId: action.id,
                },
              });
            }
          }
        }
      }
    }

    if (propogations && propogations.length) {
      for (const propogation of propogations) {
        await this.prisma.actionCompleting.update({
          data: {
            closed: true,
          },
          where: {
            id: propogation.id,
          },
        });

        for (const child of propogation.shablonAction.children) {

          addedNew = true;

          const precreateActions = await this.prisma.actionCompleting.findMany({
            where: {
              shablonActionId: child.childId,
              processId: processId,
            },
          });
          const action = await this.prisma.actionCompleting.create({
            data: {
              shablonActionId: child.childId,
              processId: processId,
              level: precreateActions.length + 1,
            },
          });
          for (const inputField of child.child.inputFields) {
            await this.prisma.completedActionInputFieldValue.create({
              data: {
                completedActionId: action.id,
                processShablonActionInputFieldId: inputField.id,
                value: '',
              },
            });
          }
          await this.prisma.actionCompletingHierarchy.create({
            data: {
              parentId: propogation.id,
              childId: action.id,
            },
          });
        }
      }
    }

    if (all_waitings && all_waitings.length) {
      for (const all_waiting of all_waitings) {
        if (!all_waiting.parents.find((e) => !e.parent.completed)) {
          await this.prisma.actionCompleting.update({
            data: {
              closed: true,
            },
            where: {
              id: all_waiting.id,
            },
          });

          for (const child of all_waiting.shablonAction.children) {

            addedNew = true;

            const precreateActions = await this.prisma.actionCompleting.findMany({
              where: {
                shablonActionId: child.childId,
                processId: processId,
              },
            });
            const action = await this.prisma.actionCompleting.create({
              data: {
                shablonActionId: child.childId,
                processId: processId,
                level: precreateActions.length + 1,
              },
            });
            for (const inputField of child.child.inputFields) {
              await this.prisma.completedActionInputFieldValue.create({
                data: {
                  completedActionId: action.id,
                  processShablonActionInputFieldId: inputField.id,
                  value: '',
                },
              });
            }
            await this.prisma.actionCompletingHierarchy.create({
              data: {
                parentId: all_waiting.id,
                childId: action.id,
              },
            });
          }
        }
      }
    }

    if (one_waitings && one_waitings.length) {
      for (const one_waiting of one_waitings) {
        if (one_waiting.parents.find((e) => e.parent.completed)) {
          await this.prisma.actionCompleting.update({
            data: {
              closed: true,
            },
            where: {
              id: one_waiting.id,
            },
          });

          for (const child of one_waiting.shablonAction.children) {

            addedNew = true;

            for (const iterator of one_waiting.parents.filter((e) => !e.parent.completed)) {
              await this.prisma.actionCompleting.update({
                data: {
                  closed: true,
                },
                where: {
                  id: iterator.parentId,
                },
              });
            }
            const precreateActions = await this.prisma.actionCompleting.findMany({
              where: {
                shablonActionId: child.childId,
                processId: processId,
              },
            });
            const action = await this.prisma.actionCompleting.create({
              data: {
                shablonActionId: child.childId,
                processId: processId,
                level: precreateActions.length + 1,
              },
            });
            for (const inputField of child.child.inputFields) {
              await this.prisma.completedActionInputFieldValue.create({
                data: {
                  completedActionId: action.id,
                  processShablonActionInputFieldId: inputField.id,
                  value: '',
                },
              });
            }
            await this.prisma.actionCompletingHierarchy.create({
              data: {
                parentId: one_waiting.id,
                childId: action.id,
              },
            });
          }
        }
      }
    }

    if (addedNew) {
      await this.checkAutoActions(processId);
    }
  }

  //запустить процесс по id шаблона и id продукта (создать процесс и активные действия) вернуть id процесса
  async start(shablonId: number, productId: number, userId: number) {
    try {
      const startAction = await this.prisma.processShablonAction.findFirst({
        where: {
          type: 'START',
          processShablonId: shablonId,
        },
        include: {
          inputFields: true,
        },
      });
      if (!startAction) return;

      const startChildrenActions = await this.prisma.processShablonAction.findMany({
        where: {
          parents: {
            some: {
              parent: {
                type: 'START',
                processShablonId: shablonId,
              },
            },
          },
        },
        include: {
          inputFields: true,
        },
      });

      const process = await this.prisma.process.create({
        data: {
          processShablonId: shablonId,
          productId: productId,
        },
      });

      const start = await this.prisma.actionCompleting.create({
        data: {
          shablonActionId: startAction.id,
          processId: process.id,
          completed: true,
          setCompleteUserId: userId,
        },
      });

      for (const iterator of startChildrenActions) {
        const action = await this.prisma.actionCompleting.create({
          data: {
            shablonActionId: iterator.id,
            processId: process.id,
          },
        });
        for (const inputField of iterator.inputFields) {
          await this.prisma.completedActionInputFieldValue.create({
            data: {
              completedActionId: action.id,
              processShablonActionInputFieldId: inputField.id,
              value: '',
            },
          });
        }
        await this.prisma.actionCompletingHierarchy.create({
          data: {
            parentId: start.id,
            childId: action.id,
          },
        });
      }
      await this.checkAutoActions(process.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async getExtGroup(id: number) {
    const group: any = await this.prisma.group.findFirst({
      where: { id: id },
      include: { children: { include: { users: true } }, users: { include: { user: true } } },
    });
    if (!group) return null;

    group.allUsers = [];
    for (const user of group.users) {
      if (!group.allUsers.find((e) => e.id === user.id)) {
        group.allUsers.push(user.user);
      }
    }

    for (const iterator of group?.children) {
      Object.assign(iterator, await this.getExtGroup(iterator.id));
      for (const user of iterator.allUsers) {
        if (!group.allUsers.find((e) => e.id === user.id)) {
          group.allUsers.push(user);
        }
      }
    }

    return group;
  }

  //получить текущие активные и выполненные действия по процессу
  //(id, кто может вып., кто выполнил, поля со знач и id, запросы и список полей небходимых, выполнено ли )
  async getDayTasks(id: number, actionId?: number) {
    try {
      const action = await this.prisma.actionCompleting.findFirst({
        where: actionId
          ? {
            id: actionId,
          }
          : {
            processId: id,
            shablonAction: {
              type: 'START',
            },
          },
        include: {
          children: true,
          setCompleteUser: true,
          inputFieldValues: {
            include: {
              processShablonActionInputField: true,
            },
          },
          shablonAction: {
            include: {
              availableForUsers: {
                include: {
                  user: true,
                },
              },
              availableForUserGroups: {
                include: {
                  group: {
                    include: {
                      children: true,
                      users: {
                        include: {
                          user: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (action?.children.length) {
        for (const iterator of action?.children) {
          Object.assign(iterator, await this.getDayTasks(id, iterator.childId));
        }
      }
      if (action?.shablonAction.availableForUserGroups.length) {
        for (const group of action?.shablonAction.availableForUserGroups) {
          if (group.group.children.length) {
            Object.assign(group.group, await this.getExtGroup(group.group.id));
          }
        }
      }

      return action;
    } catch {
      throw new BadRequestException();
    }
  }

  //заполнить поля в действии передать id и значение
  async setActionInput(actionIFVId: number, value: string) {
    try {
      await this.prisma.completedActionInputFieldValue.update({
        where: {
          id: actionIFVId,
        },
        data: {
          value: value,
        },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  //выполнить действие (расчет новых активных) передать id
  async setActionChecked(actionId: number, userId: number) {
    try {
      const data = await this.prisma.actionCompleting.findFirst({
        where: {
          id: actionId,
        },
        include: {
          parents: {
            include: {
              parent: true,
            },
          },
        },
      });

      if (!data || data?.completed || data.parents.find((e) => !(e.parent.completed || e.parent.closed))) return;

      const updated = await this.prisma.actionCompleting.update({
        where: {
          id: actionId,
        },
        data: {
          completed: true,
          setCompleteUserId: userId,
        },
        include: {
          children: true,
        },
      });

      const children = await this.prisma.processShablonAction.findMany({
        where: {
          parents: {
            some: {
              parent: {
                id: updated.shablonActionId,
              },
            },
          },
        },
        include: {
          inputFields: true,
          parents: true,
        },
      });

      if (!updated.children.length)
        for (const iterator of children) {
          const precreateActions = await this.prisma.actionCompleting.findMany({
            where: {
              shablonActionId: iterator.id,
              processId: updated.processId,
            },
          });
          const action = await this.prisma.actionCompleting.create({
            data: {
              shablonActionId: iterator.id,
              processId: updated.processId,
              level: precreateActions.length + 1,
            },
          });
          for (const inputField of iterator.inputFields) {
            await this.prisma.completedActionInputFieldValue.create({
              data: {
                completedActionId: action.id,
                processShablonActionInputFieldId: inputField.id,
                value: '',
              },
            });
          }
          await this.prisma.actionCompletingHierarchy.create({
            data: {
              parentId: updated.id,
              childId: action.id,
            },
          });

          if (iterator.type === 'WAITING_ALL' || iterator.type === 'WAITING_ONE') {
            for (const otherParent of iterator.parents) {
              if (otherParent.parentId === updated.shablonActionId) continue;

              const otherParentData = await this.prisma.actionCompleting.findFirst({
                where: {
                  processId: updated.processId,
                  closed: false,
                  completed: false,
                  shablonActionId: otherParent.parentId,
                },
              });

              if (!otherParentData) continue;

              await this.prisma.actionCompletingHierarchy.create({
                data: {
                  parentId: otherParentData.id,
                  childId: action.id,
                },
              });
            }
          }
        }

      await this.checkAutoActions(updated.processId);
    } catch {
      throw new BadRequestException();
    }
  }
}
