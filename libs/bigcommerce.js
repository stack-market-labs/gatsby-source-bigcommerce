"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");exports.__esModule=!0,exports.BigCommerce=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_constants=require("../constants"),_convertValues=require("../utils/convertValues"),_request2=require("./request"),BigCommerce=function(){function BigCommerce(config){if(!config)throw new Error("BigCommerce API config required. It is required to make any call to the API");this.client_id=config.client_id,this.secret=config.secret,this.store_hash=config.store_hash,this.response_type=config.response_type,this.headers=config.headers,this.request_timeout=config.request_timeout,this.request_throttle_interval=config.request_throttle_interval,this.request_debounce_interval=config.request_debounce_interval,this.request_concurrency=config.request_concurrency,this.request_max_count=config.request_max_count,this.reporter=config.reporter}var _proto=BigCommerce.prototype;return _proto.request=function(){function request(){return _request.apply(this,arguments)}var _request=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref){var url,_ref$method,method,body,headers,fullPath,endpointUrl,request,_yield$request$run,data,_data$meta$pagination,totalPages,currentPage,promises,nextPage,_this=this;return _regenerator.default.wrap(function(_context){for(;;)switch(_context.prev=_context.next){case 0:return url=_ref.url,_ref$method=_ref.method,method=void 0===_ref$method?"":_ref$method,body=_ref.body,headers=_ref.headers,fullPath="/stores/"+(this.store_hash+url),endpointUrl=new URL(fullPath,_constants.REQUEST_BIGCOMMERCE_API_URL),request=new _request2.Request(_constants.REQUEST_BIGCOMMERCE_API_URL,{headers:(0,_extends2.default)({},this.headers,headers),response_type:this.response_type,request_timeout:this.request_timeout,request_throttle_interval:this.request_throttle_interval,request_debounce_interval:this.request_debounce_interval,request_max_count:this.request_max_count,request_concurrency:this.request_concurrency}),_context.next=6,request.run({url:fullPath,method:method,body:body,headers:headers,reporter:this.reporter});case 6:if(_yield$request$run=_context.sent,data=_yield$request$run.data,!("meta"in data)){_context.next=28;break}if(!("pagination"in data.meta)){_context.next=28;break}if(_data$meta$pagination=data.meta.pagination,totalPages=_data$meta$pagination.total_pages,currentPage=_data$meta$pagination.current_page,!(totalPages>currentPage)){_context.next=28;break}promises=[],nextPage=currentPage+1;case 14:if(!(nextPage<=totalPages)){_context.next=24;break}return endpointUrl.searchParams.set("page",nextPage),_context.t0=promises,_context.next=19,request.run({url:""+endpointUrl.pathname+endpointUrl.search,method:"get",body:body,headers:headers,reporter:this.reporter});case 19:_context.t1=_context.sent,_context.t0.push.call(_context.t0,_context.t1);case 21:nextPage++,_context.next=14;break;case 24:return _context.next=26,Promise.allSettled(promises).then(function(res){var _res$filter;null===res||void 0===res||null===(_res$filter=res.filter(function(subItem){return"fulfilled"===(null===subItem||void 0===subItem?void 0:subItem.status)}))||void 0===_res$filter?void 0:_res$filter.map(function(subItem){var _subItem$value,_subItem$value$data,subItemData=(null===subItem||void 0===subItem||null===(_subItem$value=subItem.value)||void 0===_subItem$value||null===(_subItem$value$data=_subItem$value.data)||void 0===_subItem$value$data?void 0:_subItem$value$data.data)||null;return data.data=data.data.concat(subItemData),data.data})}).catch(function(err){return _this.reporter.error("[ERROR] "+((null===err||void 0===err?void 0:err.message)||(0,_convertValues.convertObjectToString)(err)||"There was an error while fetching and expanding items. Please try again later.")),Promise.reject(err)});case 26:data.meta.pagination.total_pages=totalPages,data.meta.pagination.current_page=totalPages;case 28:return _context.abrupt("return","data"in data?data.data:data);case 29:case"end":return _context.stop();}},_callee,this)}));return request}(),_proto.get=function(){function get(){return _get.apply(this,arguments)}var _get=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref2){var url,body,headers,results;return _regenerator.default.wrap(function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return url=_ref2.url,body=_ref2.body,headers=_ref2.headers,_context2.next=3,this.request({url:url,method:"get",body:body,headers:headers});case 3:return results=_context2.sent,_context2.abrupt("return",results);case 5:case"end":return _context2.stop();}},_callee2,this)}));return get}(),_proto.post=function(){function post(){return _post.apply(this,arguments)}var _post=(0,_asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(_ref3){var url,body,headers,results;return _regenerator.default.wrap(function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return url=_ref3.url,body=_ref3.body,headers=_ref3.headers,_context3.next=3,this.request({url:url,method:"post",body:body,headers:headers});case 3:return results=_context3.sent,_context3.abrupt("return",results);case 5:case"end":return _context3.stop();}},_callee3,this)}));return post}(),BigCommerce}();exports.BigCommerce=BigCommerce;
//# sourceMappingURL=bigcommerce.js.map