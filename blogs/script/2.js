var new_line="&#13;";
var text1 = `<textarea class="form-control bg-dark text-white" style="height: 150px" readonly>`;
var text2 = `</textarea>`;
$(document).ready(function () {

    $(".card").lazyload({
        threshold: 0,
        limit: 6,
        selector: ".card"
    });

    $("#txtsearch").on('input', function(){
        var searchText = $(this).val().toLowerCase();
        var matchingCards = [];
        $(".card").each(function(){
          var cardText = $(this).text().toLowerCase();
          if(cardText.indexOf(searchText) !== -1){
            matchingCards.push($(this));
          }
        });
        matchingCards.sort(function(a, b){
          return $(a).text().localeCompare($(b).text());
        });
        $(".card").hide();
        $.each(matchingCards, function(index, card){
          $(card).appendTo("#myDiv").show();
        });
      });

      $("#txtsearch").keyup(function(){
        if ($(this).val().length === 0) {
            $("#myDiv").load(location.href+" #myDiv>*","");
        }
      });

    $("#mac-cleanup").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Mac-Cleanup");
        $(".modal-body").html(`
            <div align="center">
                <img src="https://user-content.gitlab-static.net/0cb6ed658043831a4b9821a5794a6e6c1775f61a/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63642f436c65616e2d75705f6e6f5f68756d616e2d6c696b655f73747566662e706e67" width="300">
            </div>
            <h4>A cleanup script for macOS</h4>
            <p>👉 คุณสมบัติ</p>
            <ul>
                <li>Empty Trash</li>
                <li>Delete unnecessary logs & files</li>
                <li>Clear cache</li>
            </ul>
            <h4>👉 ติดตั้ง</h4>
            <p>✅ ดาวน์โหลดตัวติดตั้ง</p>
            ${text1}
            cd ~
            curl -o mac-cleanup https://gitlab.com/ezynook/mac-cleanup/-/raw/main/install.sh | bash -s install
            ${text2}
            <p>✅ วิธีการใช้งาน</p>
            ${text1}$ mac-cleanup${text2}
            <hr>
            <a href="https://gitlab.com/ezynook/mac-cleanup" target="_blank">ดูเพิ่มเติม</a>
        `);
    });
    $("#anaconda").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Mac-Cleanup");
        $(".modal-body").html(`
            <div align="center">
                <img src="https://user-content.gitlab-static.net/653107496f7a8afb57a92817dc1fa36e94d977d9/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f70726163746963616c6465762f696d6167652f66657463682f732d2d4e72484439795a752d2d2f635f696d616767615f7363616c652c665f6175746f2c666c5f70726f67726573736976652c685f3930302c715f6175746f2c775f313630302f68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f692f6d6e666d63637074677174756b687374316935732e706e67" width="400">
            </div>
            <p>มีอะไรใน Package บ้าง</p>
            <ul>
                <li>jupyter notebook</li>
                <li>apache-airflow</li>
                <li>elasticsearch</li>
                <li>fastapi</li>
                <li>notebook</li>
                <li>langchain</li>
                <li>psycopg2</li>
                <li>pandas</li>
                <li>py4j</li>
                <li>pyarrow</li>
                <li>PyMySQL</li>
                <li>pyspark</li>
                <li>redis</li>
                <li>requests</li>
                <li>SQLAlchemy</li>
                <li>cx_oracle</li>
                <li>pyodbc</li>
                <li>Pillow</li>
            </ul>
            <h4>ติดตั้ง</h4>
            ${text1}
            cd ~
            wget https://gitlab.com/ezynook/anaconda3/-/raw/main/install.sh > /dev/null
            chmod +x ./install.sh
            ./install.sh
            /root/miniconda3/bin/conda update conda --offline
            /root/miniconda3/bin/conda init
            source ~/.bashrc
            ${text2}

            <hr>
            <a href="https://gitlab.com/ezynook/anaconda3" target="_blank">ดูเพิ่มเติม</a>
        `);
    });

});