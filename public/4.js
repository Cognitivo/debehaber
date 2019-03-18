(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/closingBalanceForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/accounts/closingBalanceForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/crud.vue */ "./resources/js/components/crud.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    'crud': _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      pageUrl: '/accounting/closing-balance',
      data: [],
      lastDeletedRow: []
    };
  },
  computed: {
    columns: function columns() {
      return [{
        key: 'code',
        label: this.$i18n.t('commercial.code'),
        sortable: true
      }, {
        key: 'name',
        label: this.$i18n.t('commercial.name'),
        sortable: true
      }, {
        key: 'debit',
        label: this.$i18n.t('commercial.debit'),
        sortable: true
      }, {
        key: 'credit',
        label: this.$i18n.t('commercial.credit'),
        sortable: true
      }, {
        key: 'actions',
        label: '',
        sortable: false
      }];
    },
    baseUrl: function baseUrl() {
      return '/api/' + this.$route.params.taxPayer + '/' + this.$route.params.cycle;
    }
  },
  methods: {
    onSave: function onSave() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
        app.$snack.success({
          text: app.$i18n.t('commercial.ClosingBalanceSaved')
        });
        app.$router.go(-1);
      }).catch(function (error) {
        app.$snack.danger({
          text: 'Error OMG!'
        });
      });
    },
    onSaveNew: function onSaveNew() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
        app.$snack.success({
          text: this.$i18n.t('commercial.JournalSaved', app.data.number)
        });
        app.$router.push({
          name: app.$route.name,
          params: {
            id: '0'
          }
        });
      }).catch(function (error) {
        app.$snack.danger({
          text: this.$i18n.t('general.errorMessage')
        });
      });
    },
    onCancel: function onCancel() {
      var _this = this;

      this.$swal.fire({
        title: this.$i18n.t('general.cancel'),
        text: this.$i18n.t('general.cancelVerification'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$i18n.t('general.cancelConfirmation'),
        cancelButtonText: this.$i18n.t('general.cancelRejection')
      }).then(function (result) {
        if (result.value) {
          _this.$router.go(-1);
        }
      });
    }
  },
  mounted: function mounted() {
    var app = this;
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + app.pageUrl).then(function (response) {
      app.data = response.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/closingBalanceForm.vue?vue&type=template&id=09119336&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/accounts/closingBalanceForm.vue?vue&type=template&id=09119336& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "b-row",
        { staticClass: "mb-5" },
        [
          _c(
            "b-col",
            [
              _c(
                "b-btn",
                {
                  directives: [
                    {
                      name: "shortkey",
                      rawName: "v-shortkey",
                      value: ["esc"],
                      expression: "['esc']"
                    }
                  ],
                  staticClass: "d-none d-md-block float-left",
                  on: {
                    shortkey: function($event) {
                      return _vm.onCancel()
                    },
                    click: function($event) {
                      return _vm.onCancel()
                    }
                  }
                },
                [
                  _c("i", { staticClass: "material-icons" }, [
                    _vm._v("keyboard_backspace")
                  ]),
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.$t("general.return")) +
                      "\n                "
                  )
                ]
              ),
              _vm._v(" "),
              _c("h3", { staticClass: "upper-case" }, [
                _c("img", {
                  staticClass: "mr-10",
                  attrs: { src: _vm.$route.meta.img, alt: "", width: "32" }
                }),
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.$route.meta.title) +
                    "\n            "
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-button-toolbar",
                { staticClass: "float-right d-none d-md-block" },
                [
                  _c(
                    "b-button-group",
                    { staticClass: "ml-15" },
                    [
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["ctrl", "n"],
                              expression: "['ctrl', 'n']"
                            }
                          ],
                          attrs: { variant: "primary" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onSaveNew()
                            },
                            click: function($event) {
                              return _vm.onSaveNew()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("save")
                          ]),
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.$t("general.save")) +
                              "\n                    "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["esc"],
                              expression: "['esc']"
                            }
                          ],
                          attrs: { variant: "danger" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onCancel()
                            },
                            click: function($event) {
                              return _vm.onCancel()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("cancel")
                          ]),
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.$t("general.cancel")) +
                              "\n                    "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-button-toolbar",
                { staticClass: "float-right d-md-none" },
                [
                  _c(
                    "b-button-group",
                    { staticClass: "ml-15" },
                    [
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["ctrl", "n"],
                              expression: "['ctrl', 'n']"
                            }
                          ],
                          attrs: { variant: "primary" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onSaveNew()
                            },
                            click: function($event) {
                              return _vm.onSaveNew()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("save")
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["esc"],
                              expression: "['esc']"
                            }
                          ],
                          attrs: { variant: "danger" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onCancel()
                            },
                            click: function($event) {
                              return _vm.onCancel()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("cancel")
                          ])
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-row",
        [
          _c(
            "b-col",
            [
              _c(
                "b-card",
                { attrs: { "no-body": "" } },
                [
                  _c("b-table", {
                    attrs: {
                      hover: "",
                      responsive: "",
                      items: _vm.data,
                      fields: _vm.columns,
                      "show-empty": ""
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "code",
                          fn: function(data) {
                            return [
                              data.item.is_accountable
                                ? _c("span", [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(data.item.code) +
                                        "\n                        "
                                    )
                                  ])
                                : _c("b", [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(data.item.code) +
                                        "\n                        "
                                    )
                                  ])
                            ]
                          }
                        },
                        {
                          key: "name",
                          fn: function(data) {
                            return [
                              data.item.is_accountable
                                ? _c("span", [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(data.item.name) +
                                        "\n                        "
                                    )
                                  ])
                                : _c("b", [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(data.item.name) +
                                        "\n                        "
                                    )
                                  ])
                            ]
                          }
                        },
                        {
                          key: "debit",
                          fn: function(data) {
                            return data.item.is_accountable
                              ? [
                                  _c("b-input", {
                                    attrs: {
                                      type: "text",
                                      placeholder: "Debit"
                                    },
                                    model: {
                                      value: data.item.debit,
                                      callback: function($$v) {
                                        _vm.$set(data.item, "debit", $$v)
                                      },
                                      expression: "data.item.debit"
                                    }
                                  })
                                ]
                              : undefined
                          }
                        },
                        {
                          key: "credit",
                          fn: function(data) {
                            return data.item.is_accountable
                              ? [
                                  _c("b-input", {
                                    attrs: {
                                      type: "text",
                                      placeholder: "Credit"
                                    },
                                    model: {
                                      value: data.item.credit,
                                      callback: function($$v) {
                                        _vm.$set(data.item, "credit", $$v)
                                      },
                                      expression: "data.item.credit"
                                    }
                                  })
                                ]
                              : undefined
                          }
                        }
                      ],
                      null,
                      true
                    )
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/accounts/closingBalanceForm.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/accounts/closingBalanceForm.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _closingBalanceForm_vue_vue_type_template_id_09119336___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./closingBalanceForm.vue?vue&type=template&id=09119336& */ "./resources/js/views/accounts/closingBalanceForm.vue?vue&type=template&id=09119336&");
/* harmony import */ var _closingBalanceForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./closingBalanceForm.vue?vue&type=script&lang=js& */ "./resources/js/views/accounts/closingBalanceForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _closingBalanceForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _closingBalanceForm_vue_vue_type_template_id_09119336___WEBPACK_IMPORTED_MODULE_0__["render"],
  _closingBalanceForm_vue_vue_type_template_id_09119336___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/accounts/closingBalanceForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/accounts/closingBalanceForm.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/accounts/closingBalanceForm.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_closingBalanceForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./closingBalanceForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/closingBalanceForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_closingBalanceForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/accounts/closingBalanceForm.vue?vue&type=template&id=09119336&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/accounts/closingBalanceForm.vue?vue&type=template&id=09119336& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_closingBalanceForm_vue_vue_type_template_id_09119336___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./closingBalanceForm.vue?vue&type=template&id=09119336& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/closingBalanceForm.vue?vue&type=template&id=09119336&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_closingBalanceForm_vue_vue_type_template_id_09119336___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_closingBalanceForm_vue_vue_type_template_id_09119336___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);