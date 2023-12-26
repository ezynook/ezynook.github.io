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

    $("#webmin").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Webmin – เครื่องมือดูแลระบบบนเว็บสำหรับ Linux");
        $(".modal-body").html(`
            <img src="../images/webmin.png" width="300"><br>
            Webmin เป็นเว็บแอพพลิเคชั่นซึ่งเหมาะสำหรับผู้ใช้งานบนระบบ Linux โดยผู้ดูแล Webmin สามารถเข้าจัดการภายในเซิร์ฟเวอร์ได้โดยง่าย เช่น จัดการ Apache, จัดการ DNS, กำหนดค่า Config เมล์เซิร์ฟเวอร์ และอื่นๆ อีกมากมาย โดยผู้ดูแลไม่จำเป็นต้องใช้คำสั่ง (Command) ในการเข้าจัดการ <hr>
            <strong>ใช้งานฟรีได้บน Docker</strong>
            <br>
            <ul>
                <li>VOLUME = Bind Host Volume เช่น /home/pasit</li>
            </ul>
            <textarea id="code" class="form-control bg-dark text-warning" style="height: 220px" readonly>
            docker run \\
                --name webmin \\
                --restart=always \\
                -p 10000:10000 \\
                -v <VOLUME>:/physical \\
                -d ezynook/app:webmin
            </textarea>
        `);
    });
    $("#cassandra").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Apache Cassandra");
        $(".modal-body").html(`
            <div align="center">
                <img src="../images/cassandra.png" width="200">
            </div>
            <hr>
            <p>
                Cassandra เป็น NoSQL Database ชนิดหนึ่ง ซึ่งกระจายการเก็บข้อมูลไว้หลายๆ Node เป็นสถาปัตยกรรมแบบ Masterless คือไม่มี node ที่ทำหน้าที่เป็น Master หรือ Slave เลย โดยแต่ละ Node จะแอบคุยกันเอง(ผ่าน Gossip protocol) เมื่อเราต้องการเพิ่ม Node เข้ามาใหม่ ก็เพียงทำการตั้งค่า Seed ไปยัง Node ใดๆ ก็ได้ใน Cluster แค่นี้ก็เรียบร้อย ข้อมูลก็จะทำการ Sync data ไปเก็บไว้ที่แต่ละ Node ข้อดีคือเมื่อข้อมูลกระจายกันเก็บ เวลาอ่านจะ “อ่านได้รวดเร็ว” รวมถึงข้อมูลก็จะมีสำเนาเก็บไว้ที่หลายๆ node ทำให้ข้อมูลไม่สูญหายถ้า node fail ไปบาง node (no single point of failure)
            </p>
            <h4>Setup</h4>
            <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            $ cd ~
            $ git clone https://github.com/ezynook/apache-cassandra.git
            $ docker-compose -f docker-compose-webui.yml up -d
            </textarea>
            <h4>One-line Deploy</h4>
            <textarea class="form-control bg-dark text-warning" style="height: 200px" readonly>
            $ docker volume create cassandra_data
            $ docker run \\
                --name cassandra \\
                -p 7000:7000 \\
                --restart=unless-stopped \\
                -v cassandra_data:/opt/cassandra/data \\
                -d ghcr.io/ezynook/cassandra/cassandra:latest
            </textarea>
            <h4>Create Keyspace</h4>
            <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            CREATE KEYSPACE test_db ${new_line}
                WITH REPLICATION = { ${new_line}
                'class' : 'SimpleStrategy', ${new_line}
                'replication_factor' : <Number Of Replication> ${new_line}
            };
            </textarea>
            <h4>Create Table</h4>
            <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            CREATE TABLE test_db.emp ( ${new_line}
                id int,  ${new_line}
                name text ${new_line}
                PRIMARY KEY (name, id)) ${new_line}
             WITH CLUSTERING ORDER BY (id ASC); ${new_line}
            </textarea>
            <h4>Insert Data</h4>
            <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
                INSERT INTO test_db.emp JSON '{ ${new_line}
                    "category" : "GC", ${new_line}
                    "points" : 780, ${new_line}
                    "id" : "829aa84a-4bba-411f-a4fb-38167a987cda",${new_line}
                    "lastname" : "SUTHERLAND" }';
            </textarea>
            <br>
            <a href="https://github.com/ezynook/apache-cassandra" target="_blank">ดูเพิ่มเติม</a>
        `);
    });
    $("#todo").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Todo App");
        $(".modal-body").html(`
        <div align="center">
            <img src="../images/todo.png" width="200">
        </div>
        <hr>
        <p>
        ไหนๆ ใครอยากเปลี่ยนแปลงตัวเองให้เป็นคนที่ productive มากขึ้นบ้าง เชื่อว่าหลายๆ คนน่าจะเคยเกิดเหตุการณ์ตั้งใจจะทำอะไรซักอย่าง แต่ดันลืม! เพราะไม่ได้จดเตือนตัวเองเอาไว้ ทำให้แพลนต่างๆ ต้องจัดการใหม่ทั้งหมด เสียเวลาการทำอย่างอื่นไปหลายต่อหลายรอบ

        เพราะฉะนั้นวันนี้เราจึงอยากจะมาแนะนำแอปพลิเคชั่นเจ๋งๆ ที่จะช่วยเตือนให้เรารู้ว่ามีอะไรบ้างที่ต้องทำในแต่ละวัน <br>
        <b>ใช้งานฟรี</b>
        </p>
        <h4>How to Setup</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 100px" readonly>
        $ cd ~
        $ git clone https://github.com/ezynook/Todo-App.git
        $ cd Todo-App
        </textarea>
        <h4>How to Deploy</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 50px" readonly>
            docker compose up -d --build
        </textarea>
        <h4>How to Access</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 50px" readonly>
            http://localhost #หรือไอพีแอดเดรสเครื่องของคุณ (192.168.x.x)
        </textarea>
        <hr>
        <a href="https://github.com/ezynook/Todo-App" target="_blank">ดูเพิ่มเติม</a>
        `);
    });
    $("#superset").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Apache Superset");
        $(".modal-body").html(`
        <div align="center">
            <img src="../images/superset.png" width="200">
        </div>
        <hr>
        <h4>ดาวน์โหลดและการใช้งาน</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            $ cd /path/to/superset
            $ git clone https://github.com/ezynook/superset.git
            $ docker-compose up -d --build
        </textarea>
            <a href="https://github.com/ezynook/superset" target="_blank">ดูเพิ่มเติม</a>
        `);
    });
    $("#phpipam").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Apache Superset");
        $(".modal-body").html(`
        <div align="center">
            <img src="../images/phpipam.png" width="200">
        </div>
        <hr>
        <h4>{PHPIPAM} IP Address Management System</h4>
        <p>
        PhpIPAM ใช้เพื่อจัดทำเอกสาร VLAN และโครงสร้างซับเน็ตของเครือข่ายของเรา เครื่องมือนี้สามารถจัดทำเอกสารผู้ให้บริการอินเทอร์เน็ตหรือ ISP ของเรา ข้อมูลวงจรโดยละเอียด และผู้ติดต่อทั้งหมด นอกจากนี้ยังช่วยให้เรามี Firewall Zones และ routings ที่มีเอกสารครบถ้วน ข้อมูลทั้งหมดใน phpIPAM สามารถค้นหาและเข้าถึงได้ง่าย แผนกไอทีของเราใช้ phpIPAM ซึ่งต้องใช้ชื่อผู้ใช้และรหัสผ่านในการเข้าถึงข้อมูล เนื่องจากเป็นแอปพลิเคชันบนเว็บ จึงไม่จำเป็นต้องติดตั้งไคลเอ็นต์เดสก์ท็อป เครื่องมือนี้เป็นแอปที่ยอดเยี่ยมที่สามารถจัดการงานของเราได้อย่างง่ายดาย
        </p>
        <h4>Download Project</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
        $ cd ~
        $ git clone https://github.com/ezynook/phpipam.git
        $ cd phpipam
        </textarea>
        <h4>Deploy</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 50px" readonly>
            $ docker-compose up -d --build
        </textarea>
        <h4>Database Setup</h4>
        <ul>
            <li>Username: root</li>
            <li>Password: root</li>
        </ul>
        <h4>Install Extension</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            docker exec -it phpipam \\
            /bin/bash -c "docker-php-ext-install <extension_name>"
        </textarea>
        <h4>กำหนด Schedule เพื่อให้มีการ Update alive host อัตโนมัติ</h4>
        <ul>
            <li>Linux (crontab)</li>
            <li>Windows (Task Schedule)</li>
        </ul>
        <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            touch \\
                ~/phpipam/updatecheck.sh \\
                && chmod +x ~/phpipam/updatecheck.sh \\
                && vim ~/phpipam/updatecheck.sh
        </textarea>
        <p>คัดลอง Script นี้ไปวาง</p>
        <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            #!/bin/bash
            docker exec -i phpipam bash -c \\
            "cd /var/www/html/phpipam-agent; /usr/local/bin/php index.php update"
        </textarea>
        <h4>Crontab</h4>
        <textarea class="form-control bg-dark text-warning" style="height: 50px" readonly>
            crontab -e
        </textarea>
        <p>คัดลอง Script นี้ไปวาง</p>
        <ul><li>สามารถกำหนดช่วงเวลาที่ต้องการให้ Update ในรูปแบบ Cron <a href="https://crontab.guru/">https://crontab.guru/</a></li></ul>
        <textarea class="form-control bg-dark text-white" style="height: 50px" readonly>
            */5 * * * * bash ~/phpipam/updatecheck.sh
        </textarea>
            <a href="https://github.com/ezynook/phpipam" target="_blank">ดูเพิ่มเติม</a>
        `);
    });
    $("#airflow").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Apache Airflow");
        $(".modal-body").html(`
            <p>
            Airflow คือ เครื่องมือหนึ่งในการสร้าง Data Pipeline โดยเป็น Open Source Platform ตัวหนึ่งที่ผู้ใช้สามารถเขียนโปรแกรมที่จะมาควบคุมการไหลของ Workflow และสามารถคอนเฝ้าดูการไหลได้ ซึ่งถูกพัฒนาโดย Airbnb และเริ่มใช้งานมาตั้งแต่ปี 2015 ซึ่งนอกจากสร้าง Data Pipelines ได้แล้วมันยังสามารถนำไปสร้าง หรือพัฒนา ETL (Extract-Transform-Load), Machine Learning และ Predictive ได้อีกด้วย
            </p>
            <b>** และวันนี้ผมได้รวบรวมมาให้สามารถติดตั้งได้ง่ายขึ้นผ่าน Docker **</b>
            <br>
            <div align="center">
            <img width="900" src="https://camo.githubusercontent.com/efc284f2094a5f46cb5a77c6db7a69941602ef6ac4b214a6507041eab925c973/68747470733a2f2f616972666c6f772e6170616368652e6f72672f646f63732f6170616368652d616972666c6f772f737461626c652f5f696d616765732f646167732e706e67">
            </div>
            <h4>วิธีติดตั้ง</h4>
            ${text1}
            $ git clone https://github.com/ezynook/apache-airflow.git
            $ cd apache-airflow
            $ chmod +x start.sh
            $ ./start.sh --deploy
            $ ./start.sh --remove
            ${text2}
            <hr>
            <a href="https://github.com/ezynook/apache-airflow" target="_blank">ดูเพิ่มเติม</a>
        `);
    });

    $("#ckan").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Ckan Open-D");
        $(".modal-body").html(`
            <p>
            CKAN เป็นเครื่องมือสำเร็จรูปที่ทำให้ข้อมูลถูกเข้าถึงและใช้งานได้ โดยมีเครื่องมือที่ใช้ในการทำให้การเผยแพร่ การแบ่งปัน การค้นหา และการใช้งานข้อมูล (รวมไปถึงการจัดเก็บข้อมูลและการจัดเตรียม API ข้อมูลที่ทนทาน) CKAN มีจุดมุ่งหมายที่จะทำให้ผู้เผยแพร่ข้อมูล (ทั้งหน่วยงานราชการระดับประเทศและระดับภาค บริษัทห้างร้าน และองค์กร) ต้องการที่จะทำให้ข้อมูลของพวกเขาเป็นข้อมูลเปิดและเข้าถึงได้
            </p>
            <h4>วิธีการติดตั้ง CKAN Open-Data</h4>
            <p>Download CKAN Open-Data</p>
            ${text1}
            $ cd /home/
            $ git clone https://github.com/ezynook/open-data.git
            $ cd open-data/
            ${text2}
            <h4>Environment</h4>
            <p>PostgreSQL Database</p>
            <ul><li>db: ckan | username: ckan password: ckan</li></ul>
            <p>สามารถแก้ไข IP Address และ Port ได้ที่ไฟล์ .env</p>
            ${text1}
            $ vim .env

            PORT=8080
            IPADDR=192.168.10.47
            ${text2}
            <h4>Start Container</h4>
            ${text1}
            $ docker-compose up -d
            ${text2}
            <h4>Start Browser</h4>
            ${text1}
            http://<ip address>:<port>
            #Default admin username/password
            Username: admin
            Password: password
            ${text2}
            <hr>
            <a href="https://github.com/ezynook/open-data" target="_blank">ดูเพิ่มเติม</a>
        `);
    });
    $("#hadoop").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Hadoop (Big-Data)");
        $(".modal-body").html(`
            <h4>Hadoop คืออะไร</h4>
            <p>
            ทุกๆวัน ทุกๆวินาทีที่ข้อมูลหลังไหลเข้ามารวมกันจนเป็นข้อมูลขนาดใหญ่ (Big Data) นั้น ทำให้เราไม่สามารถใช้หน่วยเก็บข้อมูล และหน่วยประมวลผลแบบอันเดียวธรรมดาๆได้อีก เพราะนอกจากข้อมูลอย่าง ข้อความ รูปภาพ วิดีโอ และเสียง จะมีโครงสร้างข้อมูล (Data Structure) ที่แตกต่างกัน ไม่อยู่ในรูปแบบตารางๆแล้ว ก็ยังมี ปริมาณ ความเร็วของข้อมูลที่เพิ่มเข้ามากเกินกำลังคอมพิวเตอร์หนึ่งเครื่องอีกด้วย
            <a href="https://blog.datath.com/hadoop-hdfs-yarn-mapreduce/" target="_blank">Referance</a>
            </p>
            <b>ส่วนประกอบใน Container มี Hadoop | Hive | Prestodb</b>
            <h4>วิธีการติดตั้ง</h4>
            ${text1}
            $ cd /path/to/hadoop
            $ git clone https://github.com/ezynook/docker-bigdata.git
            $ cd docker-bigdata
            $ mkdir namenode
            $ mkdir datanode
            $ mkdir tmp
            $ docker-compose up -d
            ${text2}
            <h4>Basic Command</h4>
            ${text1}
            $ docker exec -it hive /bin/bash
            $ hive
            #Command
            {show databases, show tables}
            ${text2}
            <h4>Create Database</h4>
            ${text1}
            CREATE DATABASE
                testdb
            COMMENT
                'Default Hive database'
            LOCATION
                '/user/hive/warehouse/testdb'
            ${text2}
            <h4>Create Table</h4>
            <p>CSV Type</p>
            ${text1}
            CREATE TABLE testdb.testtbl (                      
                id string,                                     
                name string)                               
            ROW FORMAT SERDE                                   
                'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe'  
            WITH SERDEPROPERTIES (                             
                'field.delim'='|',                          
                'serialization.format'='|')                 
            STORED AS INPUTFORMAT                              
                'org.apache.hadoop.mapred.TextInputFormat'       
            OUTPUTFORMAT                                       
                'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat' 
            LOCATION                                           
                '/user/hive/warehouse/testdb/testtbl' 
            TBLPROPERTIES (
                "skip.header.line.count"="1"
            );
            ${text2}
            <p>PARQUET Type</p>
            ${text1}
            CREATE EXTERNAL TABLE testdb.testtbl(                         
                id int,                                        
                name string,                                   
                othername string)                              
            ROW FORMAT SERDE                                   
                'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe'  
            STORED AS INPUTFORMAT                              
                'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat'  
            OUTPUTFORMAT                                       
                'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat' 
            LOCATION                                           
                '/user/hive/warehouse/testdb/testtbl'
            ---------------------OR--------------------
            CREATE EXTERNAL TABLE testdb.testtbl(                         
                id int,                                        
                name string,                                   
                othername string)                               
            STORED AS PARQUET
            LOCATION                                           
                '/user/hive/warehouse/testdb/testtbl'
            ${text2}
            <h4>Access to hive</h4>
            ${text1}
            $ docker exec -it hive /bin/bash -c "hive"
            ${text2}
            <h4>Access HDFS Store</h4>
            ${text1}
            $ docker exec -it hive /bin/bash -c "hdfs dfs -ls /user/hive/warehouse/table_name"
            ${text2}
            <h4>Csv file to HDFS</h4>
            <p>
            นำไฟล์ CSV ที่ได้ทำการ ETL หรือ Cleaned แล้ว นำไฟล์มาวางไว้ที่ /tmp (CSV Seperate ต้องเป็น PIPE "|" เท่านั้น) และถ้าหากมีหลายไฟล์ชื่อต้องห้ามซ้ำกัน จากนั้นทำการ Add to HDFS Store โดยใช้คำสั่ง
            </p>
            ${text1}
            $ docker exec -it hive bash
            $ hdfs dfs -put /tmp/csv_file_name.csv /user/hive/warehouse/testdb/testtbl/
            ${text2}
            <p>จากนั้นลอง List ดูว่ามีไฟล์อยู่จริงๆหรือไม่</p>
            ${text1}
            $ hdfs dfs -ls /user/hive/warehouse/testdb/testtbl/
            ${text2}
            <p>ลอง Query โดยใช้ Hive ว่ามีข้อมูล rows หรือไม่</p>
            ${text1}
            $ docker exec -it hive bash
            $ hive
            $ use testdb;
            sql > select * from testdb.testtbl limit 10;
            ${text2}
            <hr>
            <a href="https://github.com/ezynook/docker-bigdata">ดูเพิ่มเติม</a>
        `);
    });
    $("#zabbix").click(function(){
        $("#myModal").modal("show");
        $(".modal-title").text("Zabbix");
        $(".modal-body").html(`
            <div align="center">
                <img src="https://camo.githubusercontent.com/71e79cfd6b679d246f9c432811761bc96eeeaf8680c15db2a8aa842d67398f45/68747470733a2f2f6173736574732e7a61626269782e636f6d2f696d672f6c6f676f2f7a61626269785f6c6f676f5f353030783133312e706e67" width="300">
            </div>
            <br>
            <p>
            Zabbix คือระบบ Open Source IT Infrastructure Monitoring ที่รองรับการตรวจสอบการทำงานของทั้ง Server, Storage, Network, Security และ Virtualization ภายในองค์กรได้อย่างครอบคลุม และด้วยประสบการณ์การติดตั้งและการพัฒนาส่วนเสริมต่างๆ สำหรับ Zabbix นั้นก็ทำให้ Zabbix สามารถตอบโจทย์การ Monitor ระบบใดๆ ได้ด้วยราคาประหยัดกว่าโซลูชั่นอื่นๆ เป็นอย่างมาก
            </p>
            <h4>Zabbix On Docker</h4>
            <ul>
                <li>Frontend Configuration = Default</li>
                <li>Database Configuration = Bind Remote Host</li>
                <li>Username: zabbix | Password: P@ssw0rd</li>
            </ul>
            <p>Available Version</p>
            <ul>
                <li>✔️ version 4 LTS (ezynook/zabbix:4)</li>
                <li>✔️ version 5 LTS (ezynook/zabbix:5)</li>
                <li>✔️ version 6.4 (ezynook/zabbix:6)</li>
                <li>✔️ version 7 PRE-RELEASE (ezynook/zabbix:7)</li>
            </ul>
            <h4>Setup</h4>
            <p>👉 Download Project</p>
            ${text1}
            $ cd /some/path/zabbix && git clone https://github.com/ezynook/zabbix.git
            ${text2}
            <p>👉 Change Directory</p>
            ${text1}
            $ cd zabbix
            ${text2}
            <p>👉 แก้ไข Environment ตามที่ต้องการ</p>
            <ul>
                <li>ZBX_VERSION = เวอร์ชั่นที่ต้องการ ณ ตอนนี้มี 4-7</li>
                <li>WEBPORT = Port ในการเข้าเว็บ Zabbix</li>
                <li>SNMPPORT = Port ที่ Client ส่ง SNMP</li>
                <li>ZBXAGENT = Port ที่ Client ส่ง Agent</li>
                <li>ZBXSERVER = Port Zabbix Server</li>
                <li>DBPORT = MySQL Port</li>
            </ul>
            ${text1}
            $ vim .env

            ZBX_VERSION=<version>
            WEBPORT=80
            SNMPPORT=161
            ZBXAGENT=10050
            ZBXSERVER=10051
            DBPORT=3306
            ${text2}
            <p>👉 Running</p>
            ${text1}$ chmod +x start.sh && docker-compose up -d${text2}
            <p>👉 หากต้องการแยก Web UI และ Database</p>
            ${text1}
            $ docker-compose -f docker-compose.multiple.yml up -d \\
                && docker exec -it zabbix /bin/bash -c "sed -i 's/# DBHost=localhost/DBHost=zabbixdb/g' /etc/zabbix/zabbix_server.conf" \\
                && docker restart zabbix
            ${text2}
            <p>👉 หรือใช้ Shell Script</p>
            ${text1}$ chmod +x start-multiple.sh && ./start-multiple.sh${text2}
            <ul>
                <li>🔧 ตั้งค่าหน้า WebUI ขั้นตอนตั้งค่า Database Connection ให้ติ๊ก [ ] Database TLS encryption ออก</li>
                <li>🔧 ตั้งค่าหน้า WebUI ช่อง Database Server ใส่เป็น zabbixdb</li>
            </ul>
            <p>🌎 Open Browser</p>
            ${text1}http://localhost/zabbix${text2}
            <hr>
            <a href="https://github.com/ezynook/zabbix" target="_blank">ดูเพิ่มเติม</a>
        `);
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