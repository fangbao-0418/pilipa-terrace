import React from 'react'
import MenuIcon from './Icon'
import { MenuItem } from './index'
import Config from '../config'
export default function getConfigs () {
  const configs: MenuItem[] = [
    {
      title: '商机管理',
      icon: <MenuIcon type='bussiness'/>,
      path: '',
      hidden: !hasPermission('crm_business'),
      mark: 'crm',
      children: [
        {
          title: '我的商机',
          path: '/crm/business',
          hidden: !hasPermission('crm_business_mine'),
          mark: 'crm'
        },
        {
          title: '我的预约',
          path: '/crm/appointment',
          hidden: !hasPermission('crm_business_appointment'),
          mark: 'crm'
        }
      ]
    },
    {
      title: '公海管理',
      path: '',
      icon: <MenuIcon type='open'/>,
      hidden: !hasPermission('crm_sea'),
      mark: 'crm',
      children: [
        {
          title: '公海管理',
          path: '/crm/open',
          hidden: !hasPermission('crm_sea_manage'),
          mark: 'crm'
        }
      ]
    },
    {
      title: '客资管理',
      path: '',
      icon: <MenuIcon type='customer'/>,
      hidden: !hasPermission('crm_customer'),
      mark: 'crm',
      children: [
        {
          title: '我的客资',
          path: '/crm/customer',
          hidden: !hasPermission('crm_customer_list'),
          mark: 'crm'
        }
      ]
    },
    {
      title: '签约客户',
      path: '',
      icon: <MenuIcon type='sign'/>,
      hidden: !hasPermission('crm_sign'),
      mark: 'crm',
      children: [
        {
          title: '签约客户',
          path: '/crm/signed',
          hidden: !hasPermission('crm_sign_myself'),
          mark: 'crm'
        }
      ]
    },
    {
      title: '客户设置',
      path: '',
      icon: <MenuIcon type='set' />,
      hidden: !hasPermission('crm_set'),
      mark: 'crm',
      children: [
        {
          title: '客户设置',
          path: '/crm/customer-set/index',
          hidden: !hasPermission('crm_set_customer'),
          mark: 'crm'
        },
        {
          title: '分客设置',
          path: '/crm/customer-set/assign',
          hidden: !hasPermission('crm_set_customer_diversion'),
          mark: 'crm'
        }
      ]
    },
    {
      title: '中心用户管理',
      hidden: !hasPermission('bizbase_user'),
      icon: <MenuIcon type='center' />,
      path: '',
      mark: 'permission',
      children: [
        {
          title: '账号',
          hidden: !hasPermission('bizbase_user_user_list'),
          path: '/permission/center-account',
          mark: 'permission'
        },
        {
          title: '部门',
          hidden: !hasPermission('bizbase_user_organization'),
          path: '/permission/center-department',
          mark: 'permission'
        },
        {
          title: '权限',
          hidden: !hasPermission('bizbase_user_authority'),
          path: '/permission/center-permission',
          mark: 'permission'
        },
        {
          title: '角色',
          hidden: !hasPermission('bizbase_user_role'),
          path: '/permission/center-role',
          mark: 'permission'
        }
      ]
    },
    {
      title: '机构管理',
      path: '',
      hidden: !hasPermission('bizbase_user_company'),
      icon: <MenuIcon type='organ' />,
      mark: 'permission',
      children: [
        {
          title: '机构管理',
          hidden: !hasPermission('bizbase_user_company'),
          path: '/permission/organ',
          mark: 'permission'
        }
      ]
    },
    {
      title: '用户管理',
      path: '',
      hidden: !hasPermission('bizbase_user_customer'),
      icon: <MenuIcon type='user' />,
      mark: 'permission',
      children: [
        {
          title: '代理商用户',
          hidden: !hasPermission('bizbase_user_agent'),
          path: '/permission/user-manage/agent',
          mark: 'permission'
        },
        {
          title: '直营用户',
          hidden: !hasPermission('bizbase_user_direct'),
          path: '/permission/user-manage/direct',
          mark: 'permission'
        }
      ]
    },
    {
      title: '工单管理',
      hidden: !hasPermission('track_work'),
      path: '',
      icon: <MenuIcon type='worker' />,
      mark: 'workorder',
      children: [
        {
          title: '我的工单',
          hidden: !hasPermission('track_work_order'),
          path: '/workorder/list',
          mark: 'workorder'
        }
      ]
    },
    {
      title: '消息管理',
      hidden: !hasPermission('notification_remind'),
      path: '',
      icon: <MenuIcon type='message' />,
      mark: 'message',
      children: [
        {
          title: '我的消息',
          hidden: !hasPermission('notification_remind'),
          path: '/message/list',
          mark: 'message'
        }
      ]
    },
    {
      title: '任务管理',
      mark: 'legwork',
      hidden: !hasPermission('track_outside_task'),
      path: '',
      icon: <MenuIcon type='task' />,
      children: [
        {
          title: '外勤任务列表',
          hidden: !hasPermission('track_outside_task_list'),
          path: '/legwork/outsite/task/list',
          mark: 'legwork'
        },
        {
          title: '添加外勤任务',
          hidden: !hasPermission('track_outside_task_add'),
          path: '/legwork/outsite/task/form',
          mark: 'legwork'
        }
      ]
    },
    {
      title: '任务配置',
      hidden: !hasPermission('track_outside_tasktemplate'),
      path: '',
      icon: <MenuIcon type='tasktpl' />,
      mark: 'legwork',
      children: [
        {
          mark: 'legwork',
          title: '其他任务配置',
          hidden: !hasPermission('track_outside_tasktemplate_sub'),
          path: '/legwork/outsite/tasktpl/sublist'
        },
        {
          mark: 'legwork',
          title: '通办任务配置',
          hidden: !hasPermission('track_outside_tasktemplate_main'),
          path: '/legwork/outsite/tasktpl/list'
        }
      ]
    },
    {
      mark: 'legwork',
      title: '绩效配置',
      hidden: !hasPermission('track_outside_reward'),
      path: '',
      icon: <MenuIcon type='perform' />,
      children: [
        {
          mark: 'legwork',
          title: '绩效配置',
          hidden: !hasPermission('track_outside_reward_config'),
          path: '/legwork/outsite/perform/list'
        }
      ]
    },
    {
      mark: 'legwork',
      title: '数据统计',
      hidden: !hasPermission('track_outside_data'),
      path: '',
      icon: <MenuIcon type='data' />,
      children: [
        {
          mark: 'legwork',
          title: '数据总览',
          hidden: !hasPermission('track_outside_data_overview'),
          path: '/legwork/outsite/data-overview'
        },
        {
          mark: 'legwork',
          title: '数据明细',
          hidden: !hasPermission('track_outside_data_detail'),
          path: '/legwork/outsite/data-detail'
        }
      ]
    },
    {
      mark: 'configure',
      title: '配置中心',
      path: '/configure',
      hidden: !hasPermission('config_dict'),
      icon: <MenuIcon type='configure' />
    },
    {
      mark: 'operate-log',
      title: '操作日志',
      path: '/operate-log',
      hidden: !hasPermission('bizbase_log'),
      icon: <MenuIcon type='log' />
    }
  ]
  return configs
}

export function hasPermission (key: string) {
  if (key !== undefined) {
    if (Config.user.codes.indexOf(key) > -1) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}
export const getHomePage = () => {
  let url = '/'
  getConfigs().find((item) => {
    if (item.hidden !== true) {
      if (item.path) {
        url = item.path
        Config.mark = item.mark
        return true
      } else {
        if (item.children) {
          return item.children.findIndex((item2) => {
            if (item2.hidden !== true) {
              url = item2.path
              Config.mark = item.mark
              return true
            }
          }) > -1
        }
      }
    }
  })
  return {
    path: url,
    mark: Config.mark
  }
}
