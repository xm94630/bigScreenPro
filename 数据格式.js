//提交数据
/*
{

  //"time_start":"1970-01-01 18:00:00",    // 开始时间 yyyy-MM-dd HH:mm:ss
  //"time_end":"1970-01-02 18:00:00",      // 结束时间 yyyy-MM-dd HH:mm:ss
  //"interval":60,                         // 刷新频率 单位 s

  code:0 

}
*/

//拣货进度
let myData1 = {
  total:{
    progress:0.5,
    sku:{
      finish:8888,
      total:8888,
    },
    E:{
      finish:8888,
      total:8888,
    },
    shop:{
      finish:8888,
      total:8888,
    },
  },
  lines:[
    {
      sku:{
        finish:222,
        total:222,
      },
      eNumber:{
        finish:222,
        total:222,
      },
      shopNumber:{
        finish:222,
        total:222,
      },
      shopState:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2],  //0未完成 1进行中 2完成
    }
  ]

}

//拣货补货进度
let myData2 = {
  total:{
    taskTotal:{
      SKU:888,
      E:8888,
    },
    finish:{
      SKU:888,
      E:8888,
    },
    unfinish:{
      SKU:888,
      E:8888,
    },
    abnormal :{
      SKU:888,
      E:8888,
    }
  },
  DC:{
    taskTotal:{
      SKU:888,
      E:8888,
    },
    finish:{
      SKU:888,
      E:8888,
    },
    unfinish:{
      SKU:888,
      E:8888,
    },
    abnormal :{
      SKU:888,
      E:8888,
    }
  },
  AGV:{
    taskTotal:{
      SKU:888,
      E:8888,
    },
    finish:{
      SKU:888,
      E:8888,
    },
    unfinish:{
      SKU:888,
      E:8888,
    },
    abnormal :{
      SKU:888,
      E:8888,
    }
  },
  DC2:{
    taskTotal:{
      SKU:888,
      E:8888,
    },
    finish:{
      SKU:888,
      E:8888,
    },
    unfinish:{
      SKU:888,
      E:8888,
    },
    abnormal :{
      SKU:888,
      E:8888,
    }
  },
  
}

//工作量
let myData3 = {

  total:{
    data:{
      title: {
        text: '当日拣货任务汇总',
        subtext: ''
      },
      xAxis:{
        data:['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'],
      },
      series:[
        {
          name:'2011',
          data:[10, 52, 200, 334, 390, 330, 220],
        },
        {
          name:'2012',
          data:[10, 52, 200, 334, 390, 330, 220],
        }
      ]
    }
  },

  people:{
    name:"人工拣货每人拣货量",
    data:{
      title: {
        text: '当日拣货任务汇总',
        subtext: ''
      },
      xAxis:{
        data:['甲', '乙', '丙', '丁', '甲', '甲', '甲'],
      },
      series:[
        {
          name:'2011',
          data:[10, 52, 200, 334, 390, 330, 220],
        },
        {
          name:'2012',
          data:[10, 52, 200, 334, 390, 330, 220],
        }
      ]
    }
  },
  
  AGV:{
    name:"AGV每工位拣货量",
    data:{
      title: {
        text: '当日拣货任务汇总',
        subtext: ''
      },
      xAxis:{
        data:['工作站1', '工作站2', '工作站3', '工作站4', '工作站5', '工作站6', '工作站7'],
      },
      series:[
        {
          name:'2011',
          data:[10, 52, 200, 334, 390, 330, 220],
        },
        {
          name:'2012',
          data:[10, 52, 200, 334, 390, 330, 220],
        }
      ]
    }
  },
}

myData1.total;
myData2.total;
myData3.total;


