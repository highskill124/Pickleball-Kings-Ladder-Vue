<template>
  <!--   Main Content Start Here   -->
  <main>
    <div v-if="loader">
      <div class="spinner"></div>
    </div>
    <section class="default_wraper">
      <div class="container_large">
        <div class="row">
          <div class="col-md-3">
            <!-- Sidebar Panel -->
            <sidebar-component></sidebar-component>
          </div>
          <!-- Content Panel -->
          <div class="col-md-9">
            <div class="content_column">
              <!-- event detail header component -->
              <div class="content_header">
                <h1>Winter Singles</h1>
                <event-details-header></event-details-header>
              </div>

              <div class="content_body">
                <div class="table_header">
                  <h3>Men's 3.0 Singles</h3>
                  <div class="tables_filters">
                    <select>
                      <option>Select Ladders</option>
                      <option>Men's 3.0 Singles</option>
                      <option>Men's 3.5 Singles</option>
                      <option>Men's 4.0 Singles</option>
                      <option>Men's 4.5+ Singles</option>
                      <option>Women's 2.5 Singles</option>
                      <option>Women's 3.0 Singles</option>
                      <option>Women's 3.5 Singles</option>
                      <option>Women's 4.0+ Singles</option>
                    </select>
                    <select>
                      <option>Select Week</option>
                      <option>Week 9 of 13</option>
                      <option>Week 8 of 13</option>
                    </select>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>R</th>
                        <th>W</th>
                        <th>L</th>
                        <th>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Vishnu Joshi</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Prasanth Vijayan</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Robert Sledd</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Noble Joy</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Shaji Madar</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Kenneth Mathys</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Will Boye</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Caleb Sheets</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Luke Gossert</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Matthew Merkel</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Vishnu Joshi</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Prasanth Vijayan</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Robert Sledd</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Noble Joy</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                      <tr>
                        <td>Shaji Madar</td>
                        <td><strong>1</strong></td>
                        <td>21</td>
                        <td>0</td>
                        <td>512</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!--   Main Content End Here   -->
</template>
<script>
import sidebarComponent from "./sidebar";
import eventDetailsHeader from "./event-details-header";
export default {
  components: {
    sidebarComponent,
    eventDetailsHeader,
  },
  data() {
    return {
      loader: true,
    };
  },
  created() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>