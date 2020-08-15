const version = '1.0.5'

export default function Version({align}) {
  return (
    <div className={align=="center" ? "version version-center" : align=="left" ? "version version-left" : align=="right" ? "version version-right" : "version version-center"}>
      Versão {version}
    </div>
  )
}

/*
Histórico de versões

15/08/2020 AS 14:01:32 - 1.0.5 - BRANCH: update_cleiton_20200809_205039
09/08/2020 AS 20:49:07 - 1.0.4 - BRANCH: update_cleiton_20200809_120504
09/08/2020 AS 12:03:59 - 1.0.3 - BRANCH: update_cleiton_20200809_003501
09/08/2020 AS 00:33:21 - 1.0.2 - BRANCH: update_cleiton_20200808_222522
08/08/2020 AS 22:21:27 - 1.0.1 - BRANCH: update_cleiton_20200808_220619
1.0.0 - 27/07/2020
*/
