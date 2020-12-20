import React, { createContext, useReducer, useContext } from 'react';

/// 실시간 정보
// StockExchange 에서 사용 할 기본상태
const initialState = {
  market: {
    isLoad: false,
    data: null,
    error: null,
  },
  realtimeData: {
    // isLoad: false,
    data: null,
    error: null,
  },
};

// 로딩중 상태
const loadingState = {
  isLoad: true,
  data: null,
  error: null,
};

// 성공시 상태
const success = data => ({
  // isLoad: false,
  data,
  error: null,
});

// 실패시 상태
const error = error => ({
  isLoad: false,
  data: null,
  error: error,
});

// 실시간 정보 저장
const saveRealtimeData = (realtimeData, data) => ({
  // isLoad: false,
  data: (function() {
    console.log(realtimeData)    
    if (realtimeData.data) {
        console.log(realtimeData.data)
    } else {
      const tempArr = [];
      realtimeData.data = tempArr.concat(data);
      return realtimeData.data;
    }
  })(),
  error: null,
});

// 리듀서
function ExchangeReducer(state, action) {
  switch (action.type) {
    case 'GET_MARKET':
      return {
        ...state,
        market: loadingState,
      };
    case 'GET_MARKET_SUCCESS':
      return {
        ...state,
        market: success(action.data),
      };
    case 'GET_MARKET_ERROR':
      return {
        ...state,
        market: error(action.error),
      };
    case 'GET_REALTIME_DATA':
      return {
        ...state,
        realtimeData: loadingState,
      };
    case 'GET_REALTIME_DATA_SUCCESS':
      return {
        ...state,
        realtimeData: saveRealtimeData(state.realtimeData, action.data),
      };
    case 'GET_REALTIME_DATA_ERROR':
      return {
        ...state,
        realtimeData: error(action.error),
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

// 컨텍스트 분리
const ExchangeStateContext = createContext(null);
const ExchangeDispatchContext = createContext(null);
// 위에서 선언한 두가지 컨텍스트를 Provider로 감싸준다.
export function Provider({ children }) {
  const [state, dispatch] = useReducer(ExchangeReducer, initialState);
  return (
    <ExchangeStateContext.Provider value={state}>
      <ExchangeDispatchContext.Provider value={dispatch}>
        {children}
      </ExchangeDispatchContext.Provider>
    </ExchangeStateContext.Provider>
  );
}

// Hook: 조회를 쉽게
export function useExchangeState() {
  const state = useContext(ExchangeStateContext);
  if (!state) {
    throw new Error('Cannot find Stock Provider');
  }
  return state;
}

export function useExchangeDispatch() {
  const dispatch = useContext(ExchangeDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find Stock Provider');
  }
  return dispatch;
}

// 실시간 시세 조회 함수
export async function getMarket(dispatch) {
  dispatch({
    // 마켓 가져오기 시작
    type: 'GET_MARKET',
  });
  try {
    const ws = new WebSocket('wss://testnet.bitmex.com/realtime');
    ws.onopen = () => {
      // 웹소켓 연결
      dispatch({
        type: 'GET_REALTIME_DATA',
        data: 'datas'
      });
      ws.send(
        `{"op": "subscribe", "args": ["quote:XBTUSD","trade:XBTUSD"]}`,
      );
    };
    ws.onmessage = async e => {
      // 실시간 데이터 수신
      const { data } = e;
      const text = await new Response(data).text();
      const message = JSON.parse(text)
      const MAX_TABLE_LEN = 20
      let table = message.table
      let action = message.action
      const datas ={}
      const keys = {}


      function find_by_keys(keys, table, matchData){
        for (var item in table){
          for (var k in keys){            
            if (item[k] === matchData[k]){
              return item
            }
          }
        }
      }
      function order_leaves_quantity(o){
        if (!o.leavesQty){
            return true
        }
        return o['leavesQty'] > 0
      }

      try{
        if ('subscribe' in message){
          if (message.success){
                console.log("Subscribed to " + message.subscribe)
              }
          else{
                console.error("Unable to subscribe to + "+message.request.args[0]+" Error : +"+message.error)
              }
          }
                          
        else if ('status' in message){
          if (message.status === 400){
              console.error(message.error)
              console.log(message)}
          if (message.status === 401){
            console.error("API Key incor}rect, please check and restart.")
            }}
        else if (action){
          if (!(table in datas)){
              datas[table] = []
          // There are four possible actions from the WS:
          // 'partial' - full table image
          // 'insert'  - new row
          // 'update'  - update row
          // 'delete'  - delete row
          }
          if (action === 'partial'){
            console.log(table + ": partial ",message.data)
            dispatch({
              type:'GET_REALTIME_DATA_SUCCESS',
              data:message.data
            })
            datas[table] = message.data
            // Keys are communicated on partials to let you know how to uniquely identify
            // an item. We use it for updates.
            keys[table] = message.keys
          }
          else if( action === 'insert'){
            console.log(table+' : inserting ',message.data)                      
            datas[table] += message.data
            dispatch({
              type:'GET_REALTIME_DATA_SUCCESS',
              data:message.data
            })
            // Limit the max length of the table to avoid excessive memory usage.
            // Don't trim orders because we'll lose valuable state if we do.
            if ((!(table in ['order', 'orderBookL2']) && datas[table].length) > MAX_TABLE_LEN){
                datas[table] = datas[table][MAX_TABLE_LEN / 2]}
            }

          else if (action === 'update'){
            console.log(table+" : updating",message.data)
            dispatch({
              type:'GET_REALTIME_DATA_SUCCESS',
              data:message.data
            })
              // Locate the item in the collection and update it.
              for (let updateData in message.data){
                  let item = find_by_keys(
                      keys[table], datas[table], updateData)
                  if (!item){
                      return  // No item found to update. Could happen before push                  
                  }
                  datas[table][item] = updateData
                  // Remove cancelled / filled orders
                  if (table === 'order' && !order_leaves_quantity(item)){
                    delete datas[table][item]
                    }
                  }
                }
                
          else if (action === 'delete'){
              console.log(table+" : deleting",message.data)
              dispatch({
                type:'GET_REALTIME_DATA_SUCCESS',
                data:message.data
              })
              // Locate the item in the collection and remove it.
              for (let deleteData in message['data']){
                  let item = find_by_keys(
                      keys[table], datas[table], deleteData)
                  delete datas[table][item]}
          }
          }
        }
        catch(error) {
          console.error(error);
          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
        }
      

    };
    ws.onerror = e => {
      // 실시간 데이터 수신 에러
      dispatch({
        type: 'GET_REALTIME_DATA_ERROR',
        error: e,
      });
    };
  } catch (e) {
    // 마켓 가져오기 실패
    dispatch({
      type: 'GET_MARKET_ERROR',
      error: e,
    });
  }
}
