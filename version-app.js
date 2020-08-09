const version = '1.0.1'

export default function Version({align}) {
  return (
    <div className={align=="center" ? "version version-center" : align=="left" ? "version version-left" : align=="right" ? "version version-right" : "version version-center"}>
      Versão {version}
    </div>
  )
}

/*
Histórico de versões

08/08/2020 AS 22:21:27 - 1.0.1 - BRANCH: update_cleiton_20200808_220619
1.0.0 - 27/07/2020
*/
