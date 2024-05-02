<template>
    <main id="content" role="main" class="main">
            <div class="row">
                <div class="col-4 d-flex align-items-end">
            <ul class="breadcrumb m-1 mt-0">
                <li>
                    <router-link to="/dashboard">
                        <a href="#"><i class="bi-house-door"></i></a>
                    </router-link>
                </li>
                <li>Credit Terms</li>
            </ul>
        </div>
        <div class="col-4 text-center">
            <span class="h2">List Credit Terms</span>
        </div>
        <hr class="mb-3 mt-1">
            </div>
      <div class="content container-fluid">
        <!-- Page Header -->
        <div class="card">
          <!-- Header -->
          <b-row>
            <b-col class="d-flex align-items-center">
              <b-input-group size="sm" class="mx-2">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  pleaceholder="Type to Search"
                ></b-form-input>
  
                <b-input-group-append>
                  <b-button size="sm" :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col class="d-flex justify-content-end align-items-center">
              <b-button v-b-modal.modal-add variant="primary" size="sm"
                ><i class="bi-plus-circle"></i
              ></b-button>
              <b-dropdown
                id="dropdown-right"
                right
                text="Filter Column"
                variant="dark"
                class="m-2"
                size="sm"
              >
                <template #button-content>
                  <i class="bi-sliders"></i>
                </template>
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="selected"
                  :options="fields"
                  name="flavour-1"
                  buttons
                >
                </b-form-checkbox-group>
              </b-dropdown>
            </b-col>
          </b-row>
          <!-- Main Table -->
          <b-table
            ref="tableItem"
            label-sort-asc=""
            label-sort-desc=""
            label-sort-clear=""
            :bordered="true"
            stacked="md"
            :items="Item"
            :fields="activeFields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            tbody-tr-class="row-class"
            @filtered="onFiltered"
            v-if="selected.length > 0"
            >>
            <template #cell(opsi)="row" style="width: 100px">
              <div width="0px">
                <b-dropdown
                  id="dropdown-right"
                  right
                  text="Right align"
                  variant="primary"
                  size="xs"
                >
                  <template #button-content>
                    <i class="bi-gear-fill"></i>
                  </template>
                  <b-dropdown-item
                    href="#"
                    @click="info(row.item, row.index, $event.target)"
                    >Detail</b-dropdown-item
                  >
                  <b-dropdown-item
                    href="#"
                    @click="edit(row.item, row.index, $event.target)"
                    >Edit</b-dropdown-item
                  >
                  <b-dropdown-item href="#" @click="alertDelete('Item', row.item)"
                    >Hapus</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </template>
            <template #cell(icon)="row">
              <div class="d-flex justify-content-center">
                <label
                  class="avatar overflow-hidden d-flex justify-content-center"
                  for="editAvatarUploaderModal"
                >
                  <img :src="row.value" alt="icon" />
                </label>
              </div>
            </template>
          </b-table>
  
          <b-modal
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
          >
            <div
              class="row"
              v-if="dataId !== '' && procId !== '' && microId === ''"
            >
              <div class="col-4 d-flex justify-content-between">
                <span>Kode</span>:
              </div>
              <div class="col-8 ps-1">{{ infoModal.content.appProcCode }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Nama Proses</span>:
              </div>
              <div class="col-8 ps-1">{{ infoModal.content.appProcName }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Deskripsi</span>:
              </div>
              <div class="col-8 ps-1">{{ infoModal.content.appProcDesc }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Group App</span>:
              </div>
              <div class="col-8 ps-1">{{ infoModal.content.appGroupMenu }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Tanggal Dibuat</span>:
              </div>
              <div class="col-8 ps-1">{{ infoModal.content.appProcCreated }}</div>
              <div class="col-12 d-flex justify-content-center"></div>
              <div class="row py-2 mt-2 border-top">
                <div class="col-2"></div>
                <div class="col-8 text-center"><h1>Microservice</h1></div>
                <div
                  class="col-2 d-flex justify-content-center align-items-center"
                ></div>
              </div>
              <b-table
                ref="tableMicro"
                :fields="microFields"
                :items="microservice"
                hover
                modal-scrollable
                class="table-bordered"
              >
                <template #cell(opsiMicro)="row">
                  <div width="0px">
                    <b-dropdown
                      id="dropdown-right"
                      right
                      text="Right align"
                      variant="primary"
                      size="xs"
                    >
                      <template #button-content>
                        <i class="bi-gear-fill"></i>
                      </template>
                      <b-dropdown-item
                        href="#"
                        @click="infoMicro(row.item, row.index, $event.target)"
                        >Detail</b-dropdown-item
                      >
                      <b-dropdown-item
                        href="#"
                        @click="
                          editMicroModal(row.item, row.index, $event.target)
                        "
                        >Edit</b-dropdown-item
                      >
                      <b-dropdown-item
                        href="#"
                        @click="editMicroVar(row.item, row.index, $event.target)"
                        >Edit Variabel</b-dropdown-item
                      >
                      <b-dropdown-item href="#" @click="alertDelete"
                        >Hapus</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </template>
              </b-table>
            </div>
            <div
              class="row"
              v-else-if="dataId !== '' && procId !== '' && microId !== ''"
            >
              <h4>Detail Microservice</h4>
              <div class="col-4 d-flex justify-content-between">
                <span>Kode</span>:
              </div>
              <div class="col-8 ps-1">{{ microModal.content.microCode }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Nama Microservise</span>:
              </div>
              <div class="col-8 ps-1">{{ microModal.content.microName }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Tipe</span>:
              </div>
              <div class="col-8 ps-1">{{ microModal.content.microType }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Deskripsi</span>:
              </div>
              <div class="col-8 ps-1">
                {{ microModal.content.microDescription }}
              </div>
              <div class="col-4 d-flex justify-content-between">
                <span>Placeholder</span>:
              </div>
              <div class="col-8 ps-1">
                {{ microModal.content.microPleaceholder }}
              </div>
              <div class="col-4 d-flex justify-content-between">
                <span>Icon</span>:
              </div>
              <div class="col-8 ps-1">{{ microModal.content.microIcon }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Navigate</span>:
              </div>
              <div class="col-8 ps-1">{{ microModal.content.microNavigate }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>Routing</span>:
              </div>
              <div class="col-8 ps-1">{{ microModal.content.microRouting }}</div>
              <div class="col-4 d-flex justify-content-between">
                <span>API Function Script</span>:
              </div>
              <div class="col-8 ps-1">
                {{ microModal.content.microAPIFunctionScript }}
              </div>
              <div
                class="col-12 d-flex flex-wrap justify-content-between my-4 shadow p-3 bg-white rounded"
              >
                <h4 class="d-flex align-items-center m-0">Data Microservice</h4>
                <button
                  type="button "
                  class="btn btn-xs btn-outline-secondary"
                  @click="microData = !microData"
                >
                  <i v-if="microData" class="bi-chevron-down"></i>
                  <i v-else class="bi-chevron-up"></i>
                </button>
                <pre v-if="microData" class="w-100 mt-2 mb-0"
                  >{{ JSON.stringify(microModal.content.microData, null, " ") }}
                              </pre
                >
              </div>
              <div
                class="col-12 d-flex flex-wrap justify-content-between shadow p-3 bg-white rounded"
              >
                <h4 class="d-flex align-items-center m-0">
                  Variabel Microservice
                </h4>
                <button
                  type="button "
                  class="btn btn-xs btn-outline-secondary"
                  @click="microVariable = !microVariable"
                >
                  <i v-if="microVariable" class="bi-chevron-down"></i>
                  <i v-else class="bi-chevron-up"></i>
                </button>
                <pre v-if="microVariable" class="w-100 mt-2 mb-0"
                  >{{
                    JSON.stringify(microModal.content.microVariable, null, " ")
                  }}
                              </pre
                >
              </div>
            </div>
            <div class="row" v-else>
              <div class="row col-lg-12">
                <div class="col-5 d-flex justify-content-between">
                  <span>Location Kode</span>:
                </div>
                <div class="col-7 ps-1">{{ infoModal.content.code }}</div>
                <div class="col-5 d-flex justify-content-between">
                  <span>Location Nama</span>:
                </div>
                <div class="col-7 ps-1">{{ infoModal.content.name }}</div>
                <div class="col-5 d-flex justify-content-between">
                  <span>Deskripsi</span>:
                </div>
                <div class="col-7 ps-1">{{ infoModal.content.descript }}</div>
              </div>
            </div>
            <template #modal-footer>
              <div
                v-if="dataId !== '' && procId !== '' && microId !== ''"
                class="w-100 d-flex justify-content-end"
              >
                <b-button variant="secondary" size="sm" @click="microId = ''">
                  Kembali
                </b-button>
              </div>
              <div
                v-else-if="dataId !== '' && procId !== '' && microId == ''"
                class="w-100 d-flex justify-content-end"
              >
                <b-button
                  class="me-2"
                  variant="secondary"
                  size="sm"
                  @click="$bvModal.hide('info-modal')"
                >
                  Kembali
                </b-button>
                <b-button size="sm" variant="primary" @click="addMicroservice"
                  >Tambah Micro</b-button
                >
              </div>
              <div v-else class="w-100 d-flex justify-content-end">
                <b-button
                  class="me-2"
                  variant="secondary"
                  size="sm"
                  @click="$bvModal.hide('info-modal')"
                >
                  Kembali
                </b-button>
              </div>
            </template>
          </b-modal>
          <b-modal
            :id="procModal.id"
            :title="procModal.title"
            stacked
            @ok="addProcModal"
            ok-title="Tambah Proses"
            cancel-title="Kembali"
          >
            <div class="row">
              <!-- App Proc Table -->
              <b-table
                ref="tableProc"
                hover
                :fields="procFields"
                :items="process"
              >
                <template #cell(opsiProc)="row" style="width: 100px">
                  <div width="0px">
                    <b-dropdown
                      id="dropdown-right"
                      right
                      text="Right align"
                      variant="primary"
                      size="xs"
                    >
                      <template #button-content>
                        <i class="bi-gear-fill"></i>
                      </template>
                      <b-dropdown-item
                        href="#"
                        @click="infoProc(row.item, row.index, $event.target)"
                        >Detail</b-dropdown-item
                      >
                      <b-dropdown-item
                        href="#"
                        @click="editProcModal(row.item, row.index, $event.target)"
                        >Edit</b-dropdown-item
                      >
                      <b-dropdown-item href="#" @click="alertDelete"
                        >Hapus</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </template>
                {{ process }}
              </b-table>
            </div>
          </b-modal>
  
          <b-modal
            :id="editModal.id"
            :title="editModal.title"
            @hidden="resetEditModal"
            @ok="handleEdit"
            ok-variant="success"
            ok-title="Edit"
            cancel-title="Kembali"
          >
            <form ref="form" class="row" @submit.stop.prevent="handleEditSubmit">
              <div
                class="col-4 d-flex align-items-start justify-content-between  my-1 "
              >
                <span class="m-0">Kode Credit Terms</span>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group
                  label-for="codeCOA"
                  invalid-feedback="Kode Lokasi Harus Diisi!"
                  :state="descState"
                >
                  <b-form-input
                    id="codeCOA"
                    v-model="desc"
                    :state="descState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
  
              <div
                class="col-4 d-flex align-items-start my-1 justify-content-between"
              >
                <span class="m-0">Nama Credit Terms</span>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group
                  label-for="nameLokasi"
                  invalid-feedback="Nama Lokasi Harus Diisi!"
                  :state="NameState"
                >
                  <b-form-input
                    id="nameLokasi"
                    v-model="name"
                    :state="NameState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div
                class="col-4 d-flex align-items-start my-1 justify-content-between"
              >
                <span class="m-0">Deskripsi</span>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group
                  label-for="typeDeskripsi"
                  invalid-feedback="Tipe Deskripsi Harus Diisi!"
                  :state="typeState"
                >
                <b-form-textarea
      id="typeDeskripsi"
      v-model="type"
      placeholder="Enter something..."
      rows="3"
      max-rows="4"
    ></b-form-textarea>
                </b-form-group>
              </div>
            </form>
          </b-modal>
          <b-modal
            :id="editProc.id"
            :title="editProc.title"
            @hidden="resetEditProc"
            ok-only
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
          >
            <form
              ref="form"
              @submit.stop.prevent="handleMicroEdit"
              v-if="dataId !== '' && procId !== '' && microId !== ''"
            >
              <div v-if="!microVar" class="row">
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Nama</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group
                    label-for="procName"
                    invalid-feedback="Nama Microservice Harus Diisi!"
                    :state="NameState"
                  >
                    <b-form-input
                      id="procName"
                      v-model="name"
                      :state="NameState"
                      required
                    ></b-form-input>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Kode</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group
                    label-for="procMicroCode"
                    invalid-feedback="Kode Microservice Harus Diisi!"
                    :state="descState"
                  >
                    <b-input-group
                      :prepend="this.infoModal.content.appProcCode + '.'"
                    >
                      <b-form-input
                        id="procMicroCode"
                        type="number"
                        v-model="microCode"
                        :state="descState"
                        required
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Tipe</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group
                    label-for="microType"
                    invalid-feedback="Tipe Microservice Harus Diisi!"
                    :state="typeState"
                  >
                    <b-form-input
                      id="microType"
                      v-model="type"
                      :state="typeState"
                      required
                    ></b-form-input>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Deskripsi</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group label-for="procDesc">
                    <b-form-input id="procDesc" v-model="desc"></b-form-input>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Icon</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group label-for="microIcon">
                    <b-form-input id="microIcon" v-model="image"></b-form-input>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Placeholder</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group label-for="microPleaceholder">
                    <b-form-input
                      id="microPleaceholder"
                      v-model="prov"
                    ></b-form-input>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Routing</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group label-for="microRouting">
                    <b-form-input id="microRouting" v-model="kab"></b-form-input>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">Navigate</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group label-for="microNaviagate">
                    <b-form-input
                      id="microNaviagate"
                      v-model="kec"
                    ></b-form-input>
                  </b-form-group>
                </div>
  
                <div
                  class="col-4 d-flex align-items-center justify-content-between"
                >
                  <h4 class="m-0">API Function Script</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group label-for="microFunctionScript">
                    <b-form-input
                      id="microFunctionScript"
                      v-model="prov"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-4 d-flex pt-3 justify-content-between">
                  <h4 class="m-0">Data</h4>
                  <h3>:</h3>
                </div>
                <div class="col-md-8 my-1">
                  <b-form-group label-for="microId">
                    <b-form-textarea id="microId" v-model="id"></b-form-textarea>
                  </b-form-group>
                </div>
              </div>
  
              <JsonEditorVue
                v-else
                style="height: 350px"
                v-model="arrayVariable"
                Mode="text"
                :options="{
                  Mode: 'text',
                  Modes: ['text'],
                  onError: handleJsonError,
                }"
              ></JsonEditorVue>
            </form>
            <form
              ref="form"
              class="row"
              @submit.stop.prevent="handleProcEdit"
              v-else
            >
              <div
                class="col-4 d-flex align-items-center justify-content-between"
              >
                <h4 class="m-0">Nama Proses*</h4>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group
                  label-for="procName"
                  invalid-feedback="Nama Proses Harus Diisi!"
                  :state="NameState"
                >
                  <b-form-input
                    id="procName"
                    v-model="name"
                    :state="NameState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
  
              <div
                class="col-4 d-flex align-items-center justify-content-between"
              >
                <h4 class="m-0">Kode*</h4>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group
                  label-for="procCode"
                  invalid-feedback="Kode Harus Diisi!"
                  :state="descState"
                >
                  <b-form-input
                    id="procCode"
                    v-model="id"
                    :state="descState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
  
              <div
                class="col-4 d-flex align-items-center justify-content-between"
              >
                <h4 class="m-0">Group App*</h4>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group
                  label-for="procGroup"
                  invalid-feedback="Group App Harus Diisi!"
                  :state="typeState"
                >
                  <b-form-input
                    id="procGroup"
                    v-model="type"
                    :state="typeState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
  
              <div
                class="col-4 d-flex align-items-center justify-content-between"
              >
                <h4 class="m-0">Deskripsi</h4>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group label-for="procDesc">
                  <b-form-input id="procDesc" v-model="desc"></b-form-input>
                </b-form-group>
              </div>
  
              <div
                class="col-4 d-flex align-items-center justify-content-between"
              >
                <h4 class="m-0">Routing*</h4>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group
                  label-for="procRouting"
                  invalid-feedback="Routing Harus Diisi!"
                  :state="provState"
                >
                  <b-form-input
                    id="procRouting"
                    v-model="prov"
                    :state="provState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div
                class="col-4 d-flex align-items-center justify-content-between"
              >
                <h4 class="m-0">Icon</h4>
                <h3>:</h3>
              </div>
              <div class="col-md-8 my-1">
                <b-form-group label-for="procIcon">
                  <b-form-input id="procIcon" v-model="kab"></b-form-input>
                </b-form-group>
              </div>
            </form>
            <template
              #modal-footer
              v-if="dataId !== '' && procId !== '' && microId !== ''"
            >
              <b-button
                variant="secondary"
                @click="$bvModal.hide('edit-modal-proc')"
                >Kembali</b-button
              >
              <b-button variant="success" @click="handleMicroEdit">Edit</b-button>
            </template>
            <template #modal-footer v-else>
              <b-button
                variant="secondary"
                @click="$bvModal.hide('edit-modal-proc')"
                >Kembali</b-button
              >
              <b-button variant="success" @click="handleProcEdit">Edit</b-button>
            </template>
          </b-modal>
          <b-modal
            id="modal-add"
            size="md"
            title="Tambah Credit Terms"
            no-close-on-esc
            no-close-on-backdrop
            ref="modal"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            ok-title="Tambah"
            cancel-title="Kembali"
          >
            <form ref="form" class="row p-5" @submit.stop.prevent="handleSubmit">
              <div class="col-md-12 mb-2">
                <b-form-group
                  label="Kode Credit Terms"
                  label-for="codeLocation"
                  invalid-feedback="Kode Credit Terms Harus Diisi!"
                  :state="NameState"
                >
                  <b-form-input
                    id="codeLocation"
                    v-model="desc"
                    :state="descState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-12 mb-2">
                <b-form-group
                  label="Nama Credit Terms"
                  label-for="ItemName"
                  invalid-feedback="Nama Credit Terms Harus Diisi!"
                  :state="descState"
                >
                  <b-form-input
                    id="ItemName"
                    v-model="name"
                    :state="NameState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-12 mb-2">
                <b-form-group
                  label="Deskripsi"
                  label-for="descLocation"
                  invalid-feedback="Deskripsi Harus Diisi!"
                  :state="typeState"
                >

                <b-form-textarea
      id="descLocation"
      v-model="type"
      placeholder="Enter something..."
      rows="3"
      max-rows="4"
    ></b-form-textarea>
                </b-form-group>
              </div>
            </form>
          </b-modal>
          <b-modal
            id="modal-addMicro"
            size="lg"
            title="Tambah Microservice"
            no-close-on-esc
            no-close-on-backdrop
            ref="modal"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleMicroOk"
            ok-title="Tambah"
            cancel-title="Kembali"
          >
            <form ref="form" class="row" @submit.stop.prevent="handleMicroSubmit">
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Nama Microservice"
                  label-for="microName"
                  invalid-feedback="Nama Microservice Harus Diisi!"
                  :state="NameState"
                >
                  <b-form-input
                    id="microName"
                    v-model="name"
                    :state="NameState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Tipe Microservice"
                  label-for="microType"
                  invalid-feedback="Tipe Microservice Harus Diisi!"
                  :state="typeState"
                >
                  <b-form-input
                    id="microType"
                    v-model="type"
                    :state="typeState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Deskripsi Microservice"
                  label-for="microDesc"
                >
                  <b-form-input id="microDesc" v-model="desc"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="icon Microservice"
                  label-for="microImage"
                >
                  <b-form-input id="microImage" v-model="image"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Placeholder Microservice"
                  label-for="microPleaceholder"
                >
                  <b-form-input
                    id="microPleaceholder"
                    v-model="prov"
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Routing Microservice"
                  label-for="microRouting"
                >
                  <b-form-input id="microRouting" v-model="kab"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Navigasi Microservice"
                  label-for="microNavigate"
                >
                  <b-form-input id="microNavigate" v-model="kec"></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-6 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="API Function Script"
                  label-for="microAddress"
                >
                  <b-form-input
                    id="microAddress"
                    v-model="address"
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-3 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Kode Microservice"
                  label-for="microData"
                  invalid-feedback="Kode Microservice Harus Diisi!"
                  :state="descState"
                >
                  <b-input-group
                    :prepend="this.infoModal.content.appProcCode + '.'"
                  >
                    <b-form-input
                      id="microData"
                      type="number"
                      v-model="microCode"
                      :state="descState"
                      required
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </div>
              <div class="col-md-9 mb-2">
                <b-form-group
                  class="h4 my-1"
                  label="Data Microservice"
                  label-for="microData"
                >
                  <b-form-textarea id="microData" v-model="id"></b-form-textarea>
                </b-form-group>
              </div>
            </form>
          </b-modal>
          <b-modal
            id="modal-addProc"
            size="sm"
            title="Tambah Proses"
            hide-header-close
            no-close-on-esc
            no-close-on-backdrop
            ref="modal"
            @show="resetModal"
            @hidden="resetProcDetail"
            @ok="handleOkProc"
            ok-title="Tambah"
            cancel-title="Kembali"
          >
            <form ref="form" class="row" @submit.stop.prevent="handleSubmitProc">
              <div class="col-md-12 mb-2">
                <b-form-group
                  label="Nama Proses"
                  label-for="ItemName"
                  invalid-feedback="Nama Proc Harus Diisi!"
                  :state="NameState"
                >
                  <b-form-input
                    id="ItemName"
                    v-model="name"
                    :state="NameState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-12 mb-2">
                <b-form-group
                  label="Kode"
                  label-for="ItemKode"
                  invalid-feedback="Kode Harus Diisi!"
                  :state="descState"
                >
                  <b-form-input
                    id="ItemKode"
                    v-model="id"
                    :state="descState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-12 mb-2">
                <b-form-group
                  label="Group App"
                  label-for="ItemType"
                  invalid-feedback="Group App Harus Diisi!"
                  :state="typeState"
                >
                  <b-form-input
                    id="ItemType"
                    v-model="type"
                    :state="typeState"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-12 mb-2">
                <b-form-group label="Deskripsi" label-for="ItemDesc">
                  <b-form-input id="ItemDesc" v-model="desc"></b-form-input>
                </b-form-group>
              </div>
            </form>
          </b-modal>
          <b-row class="my-3">
            <b-col sm="5" md="6" class="my-1">
              <span class="px-2">Show</span>
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"
              ></b-form-select>
              Data of {{ totalRows }} Data
            </b-col>
            <b-col sm="7" md="6" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </div>
      </div>
    </main>
  </template>
    
    <script>
  import axios from "axios";
  import {
    getCreditTerms,
    addCreditTerms,
    updateCreditTerms,
    deleteCreditTerms,
  } from "../components/services/components";
  import {
    addProc,
    addMicro,
    updateProc,
    updateMicro,
  } from "./services/usaha";
  export default {
    data() {
      return {
        optionsCategory: [],
        microData: true,
        microVariable: false,
        procFields: [
          { key: "appProcCode", label: "Kode" },
          { key: "appGroupMenu", label: "Group" },
          { key: "appProcName", label: "Nama" },
          { key: "appProcDesc", label: "Deskripsi" },
          { key: "opsiProc", label: "Opsi" },
        ],
        microFields: [
          { key: "microCode", label: "Kode" },
          { key: "microName", label: "Nama" },
          { key: "microType", label: "Tipe" },
          { key: "microDescription", label: "Deskripsi" },
          { key: "opsiMicro", label: "Opsi" },
        ],
  
        listLogo: [],
        dataId: "",
        procId: "",
        microId: "",
        dataIndex: "",
        procIndex: "",
        microIndex: "",
        totalRows: 1,
        currentPage: 1,
        perPage: 10 ,
        pageOptions: [5, 10, 15, 25],
        fields: ["code", "name", "descript", "opsi"],
        sorts: [],
        selected: ["code", "name", "descript", "opsi"],
        Item: [],
        process: [],
        microservice: [],
        filter: "",
        infoModal: {
          id: "info-modal",
          title: "",
          content: "",
        },
        editModal: {
          id: "edit-modal",
          title: "",
          content: "",
        },
        editProc: {
          id: "edit-modal-proc",
          title: "",
          content: "",
        },
        procModal: {
          id: "proc-modal",
          title: "",
          content: "",
        },
        microModal: {
          id: "micro-modal",
          title: "",
          content: "",
        },
        microVar: false,
        arrayVariable: [],
        options: [],
        microCode: "",
        id: "",
        name: "",
        type: "",
        desc: "",
        prov: "",
        kab: "",
        kec: "",
        address: "",
        image: "",
        xFilEkey: null,
  
        NameState: null,
        typeState: null,
        descState: null,
        provState: null,
        kabState: null,
        kecState: null,
        addressState: null,
        imageState: null,
      };
    },
    methods: {
      addCategory(newCat) {
        const cat = {
          name: newCat,
        };
        this.optionsCategory.push(cat);
        this.type = cat;
      },
      handleJsonError(err) {
        console.error("JSON editor error:", err);
      },
      convertToJson() {
        try {
          const lines = this.id.trim().split("\n").replace('"', "");
          lines.forEach((line) => {
            const array = line.split(",");
            this.parsedArrays.push(array);
          });
        } catch (error) {
          console.error(error);
        }
      },
      getLogo(imageUrls) {
        Promise.all(
          imageUrls.map((url) =>
            axios
              .get(url, {
                responseType: "blob", // Set the response type to arraybuffer to handle binary data
              })
              .then((responses) => URL.createObjectURL(responses.data))
          )
        ).then((imageUrls) => {
          this.listLogo = imageUrls.map((url) => ({ icon: url }));
          this.Item = this.Item.map((item, index) =>
            Object.assign({}, item, this.listLogo[index])
          );
        });
      },
      async ItemTable() {
        const data = await getCreditTerms();
        console.log(data)
        this.Item = data
        // this.optionsCategory = data.dataDistinct;
        // const imageUrls = this.Item.map((logo) => logo.domainLogo);
        // await this.getLogo(imageUrls);
        this.totalRows = this.Item.length;
        const oldCurrentPage = this.currentPage;
        this.currentPage = 1;
        this.$nextTick(() => {
          this.currentPage = oldCurrentPage;
        });
      },
      async procTable() {
        await this.ItemTable();
        this.procModal.content = this.Item.filter(
          (dTemplate) => dTemplate._id === this.dataId
        )[0];
        this.process = this.procModal.content.appProcess;
        this.$store.commit("setDataItem", this.process);
      },
      async microTable() {
        await this.procTable();
        this.microservice = this.process[this.procIndex].appProcMicroservices;
        this.microModal.content = this.microservice;
      },
  
      swalDel() {},
      successAdd() {
        this.$swal("Berhasil!", "Data berhasil ditambahkan", "success");
      },
      failedAdd() {
        this.$swal("Gagal!", "Data gagal ditambahkan!", "cancel");
      },
      successEdit() {
        this.$swal("Berhasil!", "Data berhasil Diedit", "success");
      },
      successDelete() {
        this.$swal("Berhasil!", "Data berhasil Dihapus", "success");
      },
      alertLoading() {
        this.$swal({
          title: "Loading...",
          text: "Mohon Ditunggu ya.",
          allowOutsideClick: false,
          showCancelButton: false,
          showConfirmButton: false,
          willOpen: () => {
            this.$swal.showLoading();
          },
        });
      },
      alertAdd(typeData) {
        this.$swal({
          title: "Anda Yakin?",
          text: "Tekan Tambah jika anda sudah yakin!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Tambah",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.alertLoading();
            if (typeData === "Item") {
              const data = {
                name: this.name,
                code: this.desc,
                descript: this.type,
                defaultStatus: 'release'
              };
              try {
                console.log(data);
                await addCreditTerms(data);
                await this.ItemTable();
                this.$bvModal.hide("modal-add");
                this.successAdd();
              } catch (error) {
                alert(error);
              }
            } else if (typeData === "proses") {
              const id = this.dataId;
              const data = {
                appProcCode: this.id,
                appProcName: this.name,
                appProcDesc: this.desc,
                appGroupMenu: this.type,
                appProcMicroservices: [],
              };
              try {
                await addProc(data, id);
                await this.procTable();
              } catch (error) {
                alert(error);
              }
              this.$bvModal.hide("modal-addProc");
              this.successAdd();
            } else if (typeData === "micro") {
              if (this.id == "") {
                alert(this.id, '" "');
              }
              try {
                const microData = JSON.parse(this.id);
              } catch (error) {
                console.log(error);
              }
              const link = this.dataId + "/" + this.procId;
              const data = {
                microCode:
                  this.infoModal.content.appProcCode + "." + this.microCode,
                microName: this.name,
                microType: this.type,
                microDescription: this.desc,
                microIcon: this.image,
                microData: JSON.parse(this.id),
                microVariable: [],
                microPleaceholder: this.prov,
                microRouting: this.kab,
                microNavigate: this.kec,
                microAPIFunctionScript: this.address,
              };
              try {
                await addMicro(data, link);
                await this.microTable();
                this.$bvModal.hide("modal-addMicro");
                this.successAdd();
              } catch (error) {
                alert(error);
                this.failedAdd();
              }
            }
          }
        });
      },
      alertEdit(typeData) {
        this.$swal({
          title: "Anda Yakin?",
          text: "Tekan Edit jika anda sudah yakin!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#00AB8E",
          confirmButtonText: "Edit",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.alertLoading();
            if (typeData === "Item") {
              const uId = this.id;
              const data = {
                name: this.name,
                code: this.desc,
                descript: this.type,
              };
              try {
                await updateCreditTerms(data, uId);
                await this.ItemTable();
              } catch (error) {
                alert(error);
              }
              this.$bvModal.hide("edit-modal");
              this.successEdit();
            } else if (typeData === "proses") {
              const link = this.dataId + "/" + this.procId;
              const data = {
                appProcCode: this.id,
                appProcName: this.name,
                appProcDesc: this.desc,
                appGroupMenu: this.type,
                appLinkMenu: this.prov,
                appIconMenu: this.kab,
              };
              try {
                await updateProc(data, link);
                await this.procTable();
              } catch (error) {
                alert(error);
              }
              this.$bvModal.hide("edit-modal-proc");
              this.successEdit();
            } else if (typeData === "micro") {
              const link = this.dataId + "/" + this.procId + "/" + this.microId;
              const microVar = this.microservice.find(
                (x) => x._id === this.microId
              ).microVariable;
              if (this.arrayVariable === microVar) {
                this.arrayVariable = JSON.stringify(this.arrayVariable);
              }
  
              const data = {
                microCode:
                  this.infoModal.content.appProcCode + "." + this.microCode,
                microName: this.name,
                microType: this.type,
                microDescription: this.desc,
                microIcon: this.image,
                microData: JSON.parse(this.id),
                microVariable: JSON.parse(this.arrayVariable),
                microPleaceholder: this.prov,
                microRouting: this.kab,
                microNavigate: this.kec,
                microAPIFunctionScript: this.address,
              };
              try {
                await updateMicro(data, link);
                await this.microTable();
              } catch (error) {
                alert(error);
              }
              this.$bvModal.hide("edit-modal-proc");
              this.successEdit();
            }
          }
        });
      },
      alertDelete(typeData, row) {
        this.$swal({
          title: "Anda Yakin?",
          text: "Data yang dihapus tidak dapat dikembalikan!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonText: "Kembali",
          confirmButtonText: "Ya, Hapus Saja!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (typeData === "Item") {
              try {
                await deleteCreditTerms(row._id)
                await this.ItemTable();
              } catch (error) {
                alert(error);
              }
            } else if (typeData === "proses") {
              try {
                await deleteProc(this.dataId + "/" + data._id);
                await this.procTable();
              } catch (error) {
                alert(error);
              }
            } else if (typeData === "micro") {
              try {
                await deleteMicro(
                  this.dataId + "/" + this.procId + "/" + data._id
                );
                await this.microTable();
              } catch (error) {
                alert(error);
              }
            }
            this.successDelete();
          }
        });
      },
  
      resetAll() {
        this.id = "";
        this.name = "";
        this.type = "";
        this.desc = "";
        this.prov = "";
        this.kab = "";
        this.kec = "";
        this.address = "";
        this.image = "";
  
        this.NameState = null;
        this.typeState = null;
        this.descState = null;
        this.provState = null;
        this.kabState = null;
        this.kecState = null;
        this.addressState = null;
        this.imageState = null;
      },
      resetModal() {
        this.microCode = "";
        this.resetAll();
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      numberFormat(value) {
        this.zero = Number(value.replace(/\D/g, ""));
        return value == null ? "" : this.zero.toLocaleString();
      },
      previewFiles(event) {
        const file = event.target.files[0];
        this.xFilEkey = file;
        this.image = URL.createObjectURL(file);
      },
      // edit methods
      resetEditModal() {
        this.editModal.title = "";
        this.editModal.content = "";
        this.resetAll();
      },
      edit(Item, index, button) {
        this.editModal.title = `Edit Data: ${Item.name}`;
        this.editModal.content = Item;
        this.$root.$emit("bv::show::modal", this.editModal.id, button);
  
        this.id = this.editModal.content._id;
        this.name = this.editModal.content.name;
        this.desc = this.editModal.content.code;
        this.type = this.editModal.content.descript;
      },
      handleEdit(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault();
        // Trigger submit handler
        this.handleEditSubmit();
      },
      handleEditSubmit() {
        // Exit when the form isn't valid
        if (this.name && this.desc && this.type) {
          this.alertEdit("Item");
        }
        if (this.name == "") {
          this.NameState = false;
        } else {
          this.NameState = true;
        }
        if (this.desc == "") {
          this.descState = false;
        } else {
          this.descState = true;
        }
        if (this.type == "") {
          this.typeState = false;
        } else {
          this.typeState = true;
        }
      },
  
      infoMicro(Item, index) {
        this.microModal.content = this.microservice[index];
        this.microId = this.microModal.content._id;
        this.microIndex = index;
      },
      editMicroModal(item, index, button) {
        this.editProc.title = "Edit Microservice";
        this.$root.$emit("bv::show::modal", this.editProc.id, button);
        this.microCode = parseInt(
          item.microCode.replace(this.infoModal.content.appProcCode + ".", " ")
        );
        this.name = item.microName;
        this.type = item.microType;
        this.desc = item.microDescription;
        this.image = item.microIcon;
        this.id = JSON.stringify(item.microData, null, " ");
        this.prov = item.microPleaceholder;
        this.kab = item.microRouting;
        this.kec = item.microNavigate;
        this.address = item.microAPIFunctionScript;
        this.microId = item._id;
        this.arrayVariable = item.microVariable;
      },
      editMicroVar(item, index, button) {
        this.editMicroModal(item, index, button);
        this.editProc.title = "Edit Variabel Microservice";
        this.microVar = true;
      },
      addMicroservice() {
        this.$bvModal.show("modal-addMicro");
        this.id = '" "';
      },
      // add method proc
      proc(Item, index, button) {
        this.procModal.title = `Proses Dari: ${Item.coaCode}`;
        this.procModal.content = Item;
        this.process = Item.appProcess;
        this.$root.$emit("bv::show::modal", this.procModal.id, button);
        this.dataId = Item._id;
        this.dataIndex = index;
      },
      resetProcDetail() {
        this.resetAll();
        this.$bvModal.show("proc-modal");
      },
  
      addProcModal() {
        this.$bvModal.show("modal-addProc");
      },
      handleOkProc(bvModalEvent) {
        bvModalEvent.preventDefault();
        this.handleSubmitProc();
      },
      handleSubmitProc() {
        if (this.name && this.type && this.desc) {
          this.alertAdd("proses");
        }
        // add validation
        if (!this.name) {
          this.NameState = false;
        } else {
          this.NameState = true;
        }
        if (!this.type) {
          this.typeState = false;
        } else {
          this.typeState = true;
        }
        if (!this.desc) {
          this.descState = false;
        } else {
          this.descState = true;
        }
      },
      // Item Item
      item(item) {
        const sendData = {
          title: item.coaCode,
          code: item._id,
        };
        this.$router.push({
          name: "item",
          params: {
            itemDomain: sendData,
          },
        });
      },
      // Info Proc
      infoProc(item, index, button) {
        this.infoModal.title = this.procModal.title;
        this.infoModal.content = this.procModal.content.appProcess[index];
        this.microservice = this.infoModal.content.appProcMicroservices;
        this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        this.procId = this.infoModal.content._id;
        this.procIndex = index;
      },
      // edit proc methods
      editProcModal(item, index, button) {
        this.editProc.title = this.procModal.title;
        this.$root.$emit("bv::show::modal", this.editProc.id, button);
        this.procId = this.procModal.content.appProcess[index]._id;
        this.procIndex = index;
        this.id = item.appProcCode;
        this.name = item.appProcName;
        this.desc = item.appProcDesc;
        this.type = item.appGroupMenu;
        this.prov = item.appLinkMenu;
        this.kab = item.appIconMenu;
      },
      resetEditProc() {
        this.editProc.title = "";
        this.editProc.content = "";
  
        this.microId = "";
        this.microCode = "";
        this.microVar = false;
        this.arrayVariable = [];
        this.resetAll();
      },
      handleProcEdit() {
        // Exit when the form isn't valid
        if (this.name && this.id && this.type && this.prov) {
          this.alertEdit("proses");
        }
        if (this.name == "") {
          this.NameState = false;
        } else {
          this.NameState = true;
        }
        if (this.id == "") {
          this.descState = false;
        } else {
          this.descState = true;
        }
        if (this.type == "") {
          this.typeState = false;
        } else {
          this.typeState = true;
        }
        if (this.prov == "") {
          this.provState = false;
        } else {
          this.provState = true;
        }
      },
      // add micro data
      handleMicroOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault();
        // Trigger submit handler
        this.handleMicroSubmit();
      },
      handleMicroSubmit() {
        if (this.name && this.type && this.microCode) {
          this.alertAdd("micro");
        }
        // add validation
        if (!this.name) {
          this.NameState = false;
        } else {
          this.NameState = true;
        }
        if (!this.type) {
          this.typeState = false;
        } else {
          this.typeState = true;
        }
        if (!this.microCode) {
          this.descState = false;
        } else {
          this.descState = true;
        }
      },
      handleMicroEdit() {
        if (this.name && this.type && this.microCode) {
          this.alertEdit("micro");
        }
        // add validation
        if (!this.name) {
          this.NameState = false;
        } else {
          this.NameState = true;
        }
        if (!this.type) {
          this.typeState = false;
        } else {
          this.typeState = true;
        }
      },
      // add method info
      async info(Item, index, button) {
        this.infoModal.title = `Detail Data: ${Item.name}`;
        this.infoModal.content = Item;
        this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        this.dataId = "";
      },
      resetInfoModal() {
        this.infoModal.title = "";
        this.infoModal.content = "";
        this.microservice = "";
        this.procId = "";
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault();
        // Trigger submit handler
        this.handleSubmit();
      },
      handleSubmit() {
        if (this.name && this.type && this.desc) {
          this.alertAdd("Item");
        }
        // add validation
        if (!this.name) {
          this.NameState = false;
        } else {
          this.NameState = true;
        }
        if (!this.type) {
          this.typeState = false;
        } else {
          this.typeState = true;
        }
        if (!this.desc) {
          this.descState = false;
        } else {
          this.descState = true;
        }
        if (!this.prov) {
          this.provState = false;
        } else {
          this.provState = true;
        }
        if (!this.kab) {
          this.kabState = false;
        } else {
          this.kabState = true;
        }
        if (!this.kec) {
          this.kecState = false;
        } else {
          this.kecState = true;
        }
        if (!this.address) {
          this.addressState = false;
        } else {
          this.addressState = true;
        }
        if (!this.image) {
          this.imageState = false;
        } else {
          this.imageState = true;
        }
      },
    },
    computed: {
      activeFields() {
        this.sorts = this.fields.filter((name) => this.selected.includes(name));
        return this.sorts.map((v) => {
          var Item = {};
          Item["key"] = v;
          Item["label"] = v;
          Item['thStyle']= "font-weight:600"
          Item['class']= "align-top"
          if (v !== "opsi") {
            Item["sortable"] = true;
          } else {
            (Item["fillterByFormatted"] = false),
              (Item["thStyle"] = "width:80px; font-weight:600"),
              (Item["class"] = "text-center");
          }
          if (v === "icon") {
            (Item["sortable"] = false),
              (Item["thStyle"] = "width: 60px"),
              (Item["class"] = "text-center");
          }
          if (v === "code") {
            Item["label"] = "Credit Terms Code";
          }
          if (v === "name") {
            Item["label"] = "Credit Terms Name";
          }
          if (v === "descript") {
            Item["label"] = "Deskripsi";
          }
          return Item;
        });
      },
    },
    async mounted() {
      this.$store.commit("setBtnList", []);
      this.$store.commit("setTopbarTitle", "Data COA");
      // const optJenis = await getOptJenis();
      // this.options = optJenis.map((v) => ({
      //   value: v._id,
      //   text: v.templateName,
      // }));
      this.ItemTable();
    },
  };
  </script>
  
  <style>
  .btn:has(input[value="opsi"]) {
    display: none;
  }
  </style>