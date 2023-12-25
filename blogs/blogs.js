var new_line="&#13;";
$(document).ready(function () {

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
            <h1>Setup</h1>
            <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            $ cd ~
            $ git clone https://github.com/ezynook/apache-cassandra.git
            $ docker-compose -f docker-compose-webui.yml up -d
            </textarea>
            <h1>One-line Deploy</h1>
            <textarea class="form-control bg-dark text-warning" style="height: 200px" readonly>
            $ docker volume create cassandra_data
            $ docker run \\
                --name cassandra \\
                -p 7000:7000 \\
                --restart=unless-stopped \\
                -v cassandra_data:/opt/cassandra/data \\
                -d ghcr.io/ezynook/cassandra/cassandra:latest
            </textarea>
            <h1>Create Keyspace</h1>
            <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            CREATE KEYSPACE test_db ${new_line}
                WITH REPLICATION = { ${new_line}
                'class' : 'SimpleStrategy', ${new_line}
                'replication_factor' : <Number Of Replication> ${new_line}
            };
            </textarea>
            <h1>Create Table</h1>
            <textarea class="form-control bg-dark text-warning" style="height: 150px" readonly>
            CREATE TABLE test_db.emp ( ${new_line}
                id int,  ${new_line}
                name text ${new_line}
                PRIMARY KEY (name, id)) ${new_line}
             WITH CLUSTERING ORDER BY (id ASC); ${new_line}
            </textarea>
            <h1>Insert Data</h1>
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
        <h1>How to Setup</h1>
        <textarea class="form-control bg-dark text-warning" style="height: 100px" readonly>
        $ cd ~
        $ git clone https://github.com/ezynook/Todo-App.git
        $ cd Todo-App
        </textarea>
        <h1>How to Deploy</h1>
        <textarea class="form-control bg-dark text-warning" style="height: 50px" readonly>
            docker compose up -d --build
        </textarea>
        <h1>How to Access</h1>
        <textarea class="form-control bg-dark text-warning" style="height: 50px" readonly>
            http://localhost #หรือไอพีแอดเดรสเครื่องของคุณ (192.168.x.x)
        </textarea>
        <hr>
        <a href="https://github.com/ezynook/Todo-App" target="_blank">ดูเพิ่มเติม</a>
        `);
    });


});