(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/journalForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/crud.vue */ "./resources/js/components/crud.vue");
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
      data: {
        date: '',
        details: [],
        id: 0,
        number: '',
        comment: '',
        template_id: '',
        template: '',
        value: ''
      },
      pageUrl: '/accounting/journals',
      accountCharts: [],
      templates: [],
      lastDeletedRow: []
    };
  },
  computed: {
    columns: function columns() {
      return [{
        key: 'chart_id',
        label: this.$i18n.t('commercial.account'),
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
    Balance: function Balance() {
      var debit = 0;
      var credit = 0;
      this.data.details.forEach(function (e) {
        debit += e.debit;
        credit += e.credit;
        console.log(e);
      });
      return debit - credit;
    },
    baseUrl: function baseUrl() {
      return '/api/' + this.$route.params.taxPayer + '/' + this.$route.params.cycle;
    }
  },
  methods: {
    onSave: function onSave() {
      var app = this;

      if (app.Balance < 0) {
        _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
          app.$snack.success({
            text: app.$i18n.t('commercial.JournalSaved')
          });
          app.$router.go(-1);
        })["catch"](function (error) {
          app.$snack.danger({
            text: 'Error OMG!'
          });
        });
      }
    },
    onSaveNew: function onSaveNew() {
      var app = this;

      if (app.Balance === 0) {
        _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
          app.$snack.success({
            text: app.$i18n.t('commercial.JournalSaved')
          });
          app.data.date = '', app.data.details = [], app.data.id = 0, app.data.number = '', app.data.comment = '', app.data.template_id = '', app.data.template = '', app.data.value = '';
          app.$router.push({
            name: app.$route.name,
            params: {
              id: "0"
            }
          });
        })["catch"](function (error) {
          app.$snack.danger({
            text: this.$i18n.t('general.errorMessage')
          });
        });
      }
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
    },
    addDetailRow: function addDetailRow() {
      this.data.details.push({
        // index: this.data.details.length + 1,
        id: 0,
        chart_id: this.accountCharts[0].id,
        debit: '0',
        credit: '0'
      });
    },
    deleteRow: function deleteRow(item) {
      if (item.id > 0) {
        var app = this;
        _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onDelete(app.baseUrl + app.pageUrl + '/details', item.id).then(function (response) {});
      }

      this.lastDeletedRow = item;
      this.$snack.success({
        text: this.$i18n.t('general.rowDeleted'),
        button: this.$i18n.t('general.undo'),
        action: this.undoDeletedRow
      });
      this.data.details.splice(this.data.details.indexOf(item), 1);
    },
    undoDeletedRow: function undoDeletedRow() {
      if (this.lastDeletedRow.id > 0) {
        _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl + '/details', this.lastDeletedRow).then(function (response) {}); //axios code to insert detail again??? or let save do it.
      }

      this.data.details.push(this.lastDeletedRow);
    },
    onGenerateDetail: function onGenerateDetail() {
      var app = this;
      app.data.template_id = app.data.template.id;
      app.data.template.details.forEach(function (element) {
        app.data.details.push({
          id: 0,
          chart_id: element.chart_id,
          debit: app.data.value * element.debit_coef,
          credit: app.data.value * element.credit_coef
        });
      });
    }
  },
  mounted: function mounted() {
    var app = this;

    if (app.$route.params.id > 0) {
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + app.pageUrl + '/' + app.$route.params.id).then(function (response) {
        app.data = response.data.data;
      });
    } else {
      app.data.date = new Date(Date.now()).toISOString().split("T")[0];
    }

    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/charts/for/accountables/").then(function (response) {
      app.accountCharts = response.data.data;
    });
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/journal-templates").then(function (response) {
      app.templates = response.data.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0& ***!
  \**************************************************************************************************************************************************************************************************************/
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
          _c("b-col", [
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
          ]),
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
                [
                  _c(
                    "b-container",
                    [
                      _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-group",
                                { attrs: { label: _vm.$t("commercial.date") } },
                                [
                                  _c("b-input", {
                                    attrs: {
                                      type: "date",
                                      required: "",
                                      placeholder: "Missing Information"
                                    },
                                    model: {
                                      value: _vm.data.date,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "date", $$v)
                                      },
                                      expression: "data.date"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-group",
                                {
                                  attrs: { label: _vm.$t("commercial.number") }
                                },
                                [
                                  _c("b-input", {
                                    directives: [
                                      {
                                        name: "mask",
                                        rawName: "v-mask",
                                        value:
                                          _vm.spark.taxPayerConfig
                                            .document_mask,
                                        expression:
                                          "spark.taxPayerConfig.document_mask"
                                      }
                                    ],
                                    attrs: {
                                      type: "text",
                                      placeholder: "Invoice Number"
                                    },
                                    model: {
                                      value: _vm.data.number,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "number", $$v)
                                      },
                                      expression: "data.number"
                                    }
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
                [
                  _c(
                    "b-container",
                    [
                      _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-group",
                                {
                                  attrs: { label: _vm.$t("commercial.comment") }
                                },
                                [
                                  _c("b-input", {
                                    attrs: {
                                      type: "text",
                                      placeholder: "Comment"
                                    },
                                    model: {
                                      value: _vm.data.comment,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "comment", $$v)
                                      },
                                      expression: "data.comment"
                                    }
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
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-card",
                [
                  _c(
                    "b-container",
                    [
                      _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-group",
                                {
                                  attrs: {
                                    label: _vm.$t("commercial.template")
                                  }
                                },
                                [
                                  _c(
                                    "b-form-select",
                                    {
                                      model: {
                                        value: _vm.data.template,
                                        callback: function($$v) {
                                          _vm.$set(_vm.data, "template", $$v)
                                        },
                                        expression: "data.template"
                                      }
                                    },
                                    _vm._l(_vm.templates, function(item) {
                                      return _c(
                                        "option",
                                        {
                                          key: item.key,
                                          domProps: { value: item }
                                        },
                                        [_vm._v(_vm._s(item.name))]
                                      )
                                    }),
                                    0
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-group",
                                {
                                  attrs: { label: _vm.$t("commercial.value") }
                                },
                                [
                                  _c(
                                    "b-input-group-append",
                                    [
                                      _c("b-input", {
                                        attrs: {
                                          type: "text",
                                          placeholder: "Value"
                                        },
                                        model: {
                                          value: _vm.data.value,
                                          callback: function($$v) {
                                            _vm.$set(_vm.data, "value", $$v)
                                          },
                                          expression: "data.value"
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "b-btn",
                                        {
                                          attrs: { variant: "primary" },
                                          on: {
                                            click: function($event) {
                                              return _vm.onGenerateDetail()
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm.$t("general.generate")
                                              ) +
                                              "\n                                    "
                                          )
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
                "b-btn",
                {
                  directives: [
                    {
                      name: "shortkey",
                      rawName: "v-shortkey",
                      value: ["ctrl", "d"],
                      expression: "['ctrl', 'd']"
                    }
                  ],
                  staticClass: "mb-5",
                  attrs: { size: "sm" },
                  on: {
                    shortkey: function($event) {
                      return _vm.addDetailRow(_vm.data.details)
                    },
                    click: function($event) {
                      return _vm.addDetailRow(_vm.data.details)
                    }
                  }
                },
                [
                  _c("i", { staticClass: "material-icons mi-18" }, [
                    _vm._v("playlist_add")
                  ]),
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.$t("general.addRowDetail")) +
                      "\n            "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "b-card",
                { attrs: { "no-body": "" } },
                [
                  _c("b-table", {
                    attrs: {
                      hover: "",
                      items: _vm.data.details,
                      fields: _vm.columns
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "chart_id",
                        fn: function(data) {
                          return [
                            _c(
                              "b-form-select",
                              {
                                model: {
                                  value: data.item.chart_id,
                                  callback: function($$v) {
                                    _vm.$set(data.item, "chart_id", $$v)
                                  },
                                  expression: "data.item.chart_id"
                                }
                              },
                              _vm._l(_vm.accountCharts, function(item) {
                                return _c(
                                  "option",
                                  {
                                    key: item.key,
                                    domProps: { value: item.id }
                                  },
                                  [_vm._v(_vm._s(item.name))]
                                )
                              }),
                              0
                            )
                          ]
                        }
                      },
                      {
                        key: "debit",
                        fn: function(data) {
                          return [
                            _c("b-input", {
                              attrs: { type: "text", placeholder: "Debit" },
                              model: {
                                value: data.item.debit,
                                callback: function($$v) {
                                  _vm.$set(data.item, "debit", $$v)
                                },
                                expression: "data.item.debit"
                              }
                            })
                          ]
                        }
                      },
                      {
                        key: "credit",
                        fn: function(data) {
                          return [
                            _c("b-input", {
                              attrs: { type: "text", placeholder: "credit" },
                              model: {
                                value: data.item.credit,
                                callback: function($$v) {
                                  _vm.$set(data.item, "credit", $$v)
                                },
                                expression: "data.item.credit"
                              }
                            })
                          ]
                        }
                      },
                      {
                        key: "actions",
                        fn: function(data) {
                          return [
                            _c(
                              "b-button",
                              {
                                attrs: { variant: "link" },
                                on: {
                                  click: function($event) {
                                    return _vm.deleteRow(data.item)
                                  }
                                }
                              },
                              [
                                _c(
                                  "i",
                                  { staticClass: "material-icons text-danger" },
                                  [_vm._v("delete_outline")]
                                )
                              ]
                            )
                          ]
                        }
                      }
                    ])
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

/***/ "./resources/js/components/journalForm.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/journalForm.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./journalForm.vue?vue&type=template&id=1fcf8bc0& */ "./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&");
/* harmony import */ var _journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journalForm.vue?vue&type=script&lang=js& */ "./resources/js/components/journalForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/journalForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/journalForm.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/journalForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./journalForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./journalForm.vue?vue&type=template&id=1fcf8bc0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);